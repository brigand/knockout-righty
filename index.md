---
layout: demo
title:
---

# knockout-righty

Righty is a plugin for custom context menus in Knockout.  It follows the usual rules of a Knockout plugin,
and doesn't depend on a library like jQuery.  It should work on most browsers made in the past 10 years,
but create an issue if it doesn't.

You first need a menu.

```html
<ul data-bind="menuName: 'myMenu'">
    <li>These</li>
    <li>have</li>
    <li>hypothetical</li>
    <li>actions</li>
</ul>
```

Then you a scope for your menu.  This can be an element or multiple elements.  Use the body element if you want
it to work anywhere.

```html
<button data-bind="menuScope: 'myMenu'">Right Click Here</button>
```

It will automagically find the best position for the menu to display, based on the cursor position in the view port.
Try right clicking on different corners of the screen (on [this page](http://brigand.github.io/knockout-righty/) if you're
not already there).

If you want to be notified when a menu is shown, put a menuShow binding.  The function will be passed a reference
to the clicked element.

```html
<ul data-bind="menuName: 'myMenu', menuShow: functionToCall">...</ul>
```

----

## What Else?

There really isn't anything else.  Want to customize the menus based on some criteria?  Great, knockout bindings work in
the menus!





