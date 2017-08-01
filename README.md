# smartMenu

A simple runtime menu to navigate trhought page anchors

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



### Initialise

```javascript
$(function(){
  $('[data-smart-menu]').smartMenu();
});
```


### Options


Option         | default          |   |
--------------------|------------------|-----------------------|
prependTo				| 'body'   | Element to prepend the menu  |
hashSuffix|''|Attach a suffix to navigation hash
scrollSpeed|800|Page scroll speed
offset|80|Scroll offset