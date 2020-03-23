; A list of functions
(def nthice (map #(partial * %1) (range 10)))
(println ((nth nthice 2) 3))
