/**
 * Created by zkx on 2019/7/5.
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
    },
    fuzzyMatch: (source, target, type) => {
        var reg;
        switch(type){
            case 'post':
                reg = '^' + target + '.*$';
                reg = new RegExp(reg, 'i');
                break;
            case 'all':
                reg = target.split("").join('.*');
                reg = '.*' + reg + '.*';
                reg = new RegExp(reg, 'i');
                break;
            default:
                reg = '^.*' + target + '.*$';
                reg = new RegExp(reg, 'i');
                break;
        }

        return reg.test(source);
    }
}