import numpy as np
import cv2
import sys
import json

#takes a list of equivalences
#returns a list of disjoint sets
def union(a):
    a = map(set, a)
    unions = []
    for item in a:
        temp = []
        for s in unions:
            if not s.isdisjoint(item):
                item = s.union(item)
            else:
                temp.append(s)
        temp.append(item)
        unions = temp
    return unions

#takes a binary or grayscale image, structuring element, and Bool indicating operation
#returns transformed image after applying max or min using structuring element
def morph(img, struct, max=True):
    a = img.view(np.ma.MaskedArray)

    n = struct.shape[0]
    w_size = (struct.shape[0] - 1) / 2

    mask = np.logical_not(struct)

    out = np.zeros(img.shape)
    for (i,j), v in np.ndenumerate(out):
        win = a.take(range(i-w_size,i+w_size+1),mode='wrap', axis=0).take(range(j-w_size,j+w_size+1),mode='wrap',axis=1)#neighbors(img, i, j, n)
        win.mask = mask
        if max:
            out.itemset((i,j), win.max())
        else:
            out.itemset((i,j), win.min())

    return out

#takes binary (or grayscale) image and structuring element
#returns image dilated by the structuring element
def dilate(img, struct):
    return morph(img, struct, True)

#takes binary (or grayscale) image and structuring element
#returns image eroded by the structuring element
def erode(img, struct):
    return morph(img, struct, False)

#takes binary image
#returns array of labeled components
def connected_components(img):
    out = np.zeros(img.shape)

    num_comps = 0
    relations = []

    indices = np.nonzero(img)

    for i,j in zip(indices[0], indices[1]):
        win = out.take(range(i-1,i+1),mode='wrap', axis=0).take(range(j-1,j+2),mode='wrap',axis=1).flatten()
        val = 0
        for n in win:
            if n != 0:
                if val == 0:
                    val = n
                elif val < n:
                    relations.append([val,n])
                elif val > n:
                    relations.append([n,val])
                    val = n
        if val == 0:
            num_comps += 1
            out.itemset((i,j), num_comps)
            relations.append([num_comps])
        else:
            out.itemset((i,j), val)

    sets = union(relations)

    #relabeled = np.zeros(out.shape)
    #for k in range(len(sets)):
    #    relabeled[out in sets[k]] = k+1

    for i,j in zip(indices[0], indices[1]):
        for k in range(len(sets)):
            if out[i,j] in sets[k]:
                out.itemset((i,j), k+1)
                break

    return out

#takes labeled image
#return list of centroid pairs (x,y)
def centroids(labels):
    n = len(np.unique(labels))-1
    out = []
    for i in range(1,n+1):
        indices = np.where(labels == i)
        c = (int(np.mean(indices[0])), int(np.mean(indices[1])))
        out.append(c)
    return out

def main():
    if len(sys.argv) != 3:
        print("Invalid command line arguments (image name, json name)")
        return

    img = cv2.imread(sys.argv[1], 0)

    print "Beginning processing..."



    #binary threshold
    ret,thr = cv2.threshold(img,195,255,cv2.THRESH_BINARY_INV)
    #thr = cv2.adaptiveThreshold(img,255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY_INV,11,2)

    #erode to clean up image
    struct = cv2.getStructuringElement(cv2.MORPH_RECT, (5,5))
    #e = erode(thr, struct)
    e = cv2.erode(thr, struct)

    # labeled image
    labels = connected_components(e)
    #labels[labels != 7] = 0

    #normalize for output
    norm = cv2.normalize(labels)

    #centroids
    c = centroids(labels)

    points = []
    pickups = []

    jsondata = {"background":"Skin_Background", "inkDecrease":0.105}

    for (i,j) in c:
        if img[i,j] == 0:
            points.append({"x":j,"y":i})
        else:
            pickups.append({"x":j,"y":i})

    jsondata["points"] = points
    jsondata["pickups"] = pickups

    with open(sys.argv[2], 'w') as outfile:
     json.dump(jsondata, outfile, sort_keys = True, indent = 4, ensure_ascii=False)


main()
