;; An immutable object is an object whose state 
;; cannot be modified after it is created.

;; Variable Rebinding
(def x [10 20 30 40])
(def x (conj x 50))
(println x)

