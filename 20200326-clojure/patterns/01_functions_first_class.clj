; First-class function
; The language supports:

;     1. passing functions as arguments to other functions
;     2. returning them as the values from other functions
;     3. assigning them to variables or storing them in data structures
(defn factorial [n] (reduce *' (range 1 (inc n))))






; 1. Passing functions as arguments to other functions
(println (map factorial (range 10)))

; 2. Returning functions from other functions
(def plus-one (partial + 1))
(println (plus-one 10))

; 3. Storing functions in variables and Data Structures
(def twice (fn [x] (* x 2)))
(println (twice 10))
