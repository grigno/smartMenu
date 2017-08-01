# smartMenu

A simple runtime menu to navigate through page anchors

### Demo
[HERE](https://grigno.github.io/smartMenu/)

### Install
```
bower install smartMenu --save
```

### Dependencies
```
"jquery": ">= 2.2.0"
```


### Html DOM
```html
<div>
	<h1 data-smart-menu data-hash="title-1" data-title="Title 1">Title 1</h1>
	<p>.....</p>	
	<h1 data-smart-menu data-hash="title-2" data-title="Title 2">Title 2</h1>
	<p>.....</p>	
	....
</div>
```



### Initialization

```javascript
$(function(){
  $('[data-smart-menu]').smartMenu();
});
```


### Options


Option         | default          |   |
--------------------|------------------|-----------------------|
prependTo				| $('body')   | jquery selector: Element to prepend smartMenu  |
scrollSpeed|800|Page scroll speed
offset|80|Scroll offset