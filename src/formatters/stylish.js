import _ from 'lodash';

export default (file) => {
    const depthIndent = (depth) => '    '.repeat(depth);
    const plusGap = '  + ';
    const minusGap = '  - ';
    const neutralGap = '    ';

    const formatter = (file, depth) => {

        let result = '';

        const valueFormatter = (value) => {            
            if (_.isObject(value)) {
                let formattedValue = Array.isArray(value) ? value : [value];
                return formatter(formattedValue, depth + 1);
            }

            return value;
        };    
     
        for (const obj of file) {
            if (obj.type === "ADDED") {
                result += `${depthIndent(depth)}${plusGap}${obj.name}: ${valueFormatter(obj.value)}\n`;
            } if (obj.type === "REMOVED") {
                result += `${depthIndent(depth)}${minusGap}${obj.name}: ${valueFormatter(obj.value)}\n`;
            } if (obj.type === "UNCHANGED") {
                result += `${depthIndent(depth)}${neutralGap}${obj.name}: ${valueFormatter(obj.value)}\n`;
            } if (obj.type === "CHANGED") {
                result += `${depthIndent(depth)}${minusGap}${obj.name}: ${valueFormatter(obj.oldValue)}\n${depthIndent(depth)}${plusGap}${obj.name}: ${valueFormatter(obj.newValue)}\n`;
            } if (obj.type === "PARENT") {
                result += `${depthIndent(depth)}${neutralGap}${obj.name}: {\n${valueFormatter(obj.value)}${depthIndent(depth + 1)}}\n`;
            } if (obj.hasOwnProperty('type') === false) {
                const keys = Object.keys(obj)
                for (const key of keys) {            
                    result += _.isObject(obj[key]) ? `{\n${depthIndent(depth)}${neutralGap}${key}: ${valueFormatter(obj[key])}\n${depthIndent(depth)}}` : `{\n${depthIndent(depth)}${neutralGap}${key}: ${valueFormatter(obj[key])}\n${depthIndent(depth)}}`; 
                }               
            }      
        }

        return result;       
    };

    return `{\n${formatter(file, 0)}}`;
};



