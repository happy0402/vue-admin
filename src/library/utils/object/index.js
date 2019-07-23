/**
 * Created by zkx on 2019/7/5.
 */
export default {
    copy: (object) => {
        const deepCopy = function(o){
            if (o instanceof Array) {
                let n = [];
                for (let i = 0; i < o.length; ++i) {
                    n[i] = deepCopy(o[i]);
                }
                return n;

            } else if (o instanceof Object) {
                let n = {}
                for (let i in o) {
                    n[i] = deepCopy(o[i]);
                }
                return n;
            } else {
                return o;
            }
        }

        return deepCopy(object);
    }
}