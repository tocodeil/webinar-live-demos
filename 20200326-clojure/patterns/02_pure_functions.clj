;; Pure functions (or expressions) have no side effects (memory or I/O)
(def twice (* %1 2))

(defn twice2 [x]
  (* x 2))
