# smartMenu

A simple runtime menu to navigate through page anchors

### Install
```
bower install smartMenu --save
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



### initialization

```javascript
$(function(){
  $('[data-smart-menu]').smartMenu();
});
```


### Options


Option         | default          |   |
--------------------|------------------|-----------------------|
prependTo				| 'body'   | Element to prepend the menu  |
scrollSpeed|800|Page scroll speed
offset|80|Scroll offset