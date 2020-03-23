(def exists #(.exists (clojure.java.io/as-file %1)))

(defn find_available_filename
  ([base] (find_available_filename base 0))
  ([base i] (let [name (str base "_" i)]
              (if (exists name)
                (recur base (+ i 1))
                name))))

(println (find_available_filename "hello"))
