/**
 * Created by tx on 2019/7/5.
 */
export default {
    copy: (object) => {
        if(typeof object === 'object' && !Array.isArray(object)){
            return Object.assign({}, object);
        }
        return {};
    }
}