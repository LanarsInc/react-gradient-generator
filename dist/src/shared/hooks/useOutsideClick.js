import { useEffect, useRef } from 'react';
export var useOutsideClick = function (callback, excludedElement) {
    var ref = useRef(null);
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (excludedElement && event.target === excludedElement) {
                return;
            }
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback, excludedElement]);
    return ref;
};
//# sourceMappingURL=useOutsideClick.js.map