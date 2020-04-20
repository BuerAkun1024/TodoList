## 完成TodoList自动化测试

> 渲染所有待办事项（判断待办事项的长度即可）
> 可以添加新的待办事项
> 可以完成待办事项

### 代码和相关截图

1. 渲染所有待办事项

```js
before (async function () {
  page = await browser.newPage();
  await page.goto('http://127.0.0.1:7001/');
  count_global = await page.$$eval('#main ul li',e=>{
    var dd = e.length;
    return dd;
  });
});  

//测试todolist中item的数量
it('shoule get correct list',async function(){
  const c_list_length = await page.$$eval('#main ul li',e=>{
    var dd = e.length;
    return dd;
  });
  expect(c_list_length).to.eql(count_global + 1);
})
```

> 首先获取整个列表的长度，由后面添加一条待办事项后，列表长度加1，验证前后列表长度是增加了1.

2. 完成待办事项

```js
//完成todolist中的一个item
it('should complete seccessfully', async function(){
  const _before = await page.$eval('#todo-count > strong',el => el.value);
  await page.click('#todo-list > li:nth-child(1) > div > input',{delay:50});
  const _after = await page.$eval('#todo-count > strong',el => el.value);
  expect(_before).to.eql(_after);
})
```

> 定位到checkbox的selector，然后点击这个checkbox，之后通过验证未完成条目的数量是否减少1.

3. 最终截图

![pic](测试截图.png)

