var elems = document.querySelectorAll('select option:checked');
var values = [].map.call(elems, function(obj) {
  return obj.value;
});
