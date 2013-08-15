(function () {
    var menuElements = {}, menuShow = {};

    function isDescendant(parent, child) {
        var node = child.parentNode;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    function bindEvent(event, element, callback) {
        var current = document["on" + event];

        // Prefer addEventListener
        if (element.addEventListener) {
            element.addEventListener(event, callback)
        }

        // For IE8
        else if (current == null) {
            element["on" + event] = callback;
        }
        else {
            element["on" + event] = function () {
                return (current.apply(element, arguments) === false) || (callback.apply(element, arguments) === false);
            };
        }
    }

    ko.bindingHandlers.menuScope = {
        init: function (element, valueAccessor) {
            var menu = ko.unwrap(valueAccessor());

            function hideMenu() {
                if (menuElements[menu]) {
                    menuElements[menu].style.display = "none";
                }
            }

            function showMenu(event) {
                var menuElement = menuElements[menu], offsetY = 0, offsetX = 0, scrollTop;

                // Call the menu show event handler (which defaults to a noop)
                menuShow[menu].call(element, element);

                if (menuElement == null) return;

                scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                if (event.pageY > scrollTop + (document.documentElement.clientHeight * 0.5)) {
                    offsetY = -menuElement.height;
                }

                // if we'r on the right side of the page, push it over
                if (event.pageX > document.documentElement.clientWidth * 0.5) {
                    offsetX = -menuElement.width;
                }

                menuElement.style.position = "absolute";
                menuElement.style.display = "block";
                menuElement.style.top = offsetY + event.pageY + "px";
                menuElement.style.left = offsetX + event.pageY + "px";
            }

            if (menu) {
                function handleContext(event) {
                    // The isDescendant check allows bind to a node for all of its children
                    if (event.target === element || isDescendant(element, event.target) && menuElements[menu]) {
                        showMenu(menu);
                        bindEvent("click", document.body, hideMenu);
                        event.preventDefault();
                    }
                }

                bindEvent("contextmenu", element, handleContext);
            }

        }
    };

    ko.bindingHandlers.menuName = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var menu = ko.unwrap(valueAccessor()),
            allBindings = allBindingsAccessor();

            // event handler for the menu being shown
            menuShow[menu] = allBindings.menuShow || function(){};

            if (menu) {
                menuElements[menu] = element;
            }
        }
    };

})();