/**
 * Created by tx on 2019/7/5.
 */
export default {
    format: (str, args) => {
        var flag = true,
            i = 0;

        str = str.replace(/%s/g, function () {
            var arg = args[i++];

            if (typeof arg === 'undefined') {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    }
}