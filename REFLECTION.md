# Reflection

## Bug Fixes

- Bug(s) fixed:
1.complete SearchBar component,use debounce to limit the frequency of data change
2.complete search feature,when query change,first match tag,then match title.if match tag,change activeCategory to that tag,else change to 'All' and use regex to find partly match title
3.add empty state when no resource match
4.complete handleCategorySelect function,when category is selected,filter resources by category
5.use lodash-es for localStorage serialization 
6.complete the definition of ResourceItem interface
## Performance Improvements

- Changes made:

1.use debounce to limit the frequency of data change

- Tradeoffs:

1.conidering use debounce to improve performance and serialization for localStorage persistence,so import lodash-es.at first ,used lodash ,but lodash-es is lighter and support Tree-shaking,so finally chose lodash-es.

2.at first ,i considered to use virtual scroll to improve performance,but the data is not large enough to make a difference.

## Util list

1.IDE:Trae :use this ide to write code and it support AI, it doesn't need any config.
2.AI:IDE's default AI : use it to modify code directly without other config
3.lodash-es:use this library to serialize localStorage deserialize data and use its debounce function to limit the frequency of data change in SearchBar component.it is lighter than lodash and support Tree-shaking.

