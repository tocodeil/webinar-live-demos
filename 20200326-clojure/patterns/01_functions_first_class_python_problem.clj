; A list of functions
(def nthice (for [n (range 10)] (fn [x] (* x n))))
(println ((nth nthice 2) 3))
