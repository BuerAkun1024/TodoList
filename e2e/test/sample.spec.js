describe('add todo', function () {
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  after (async function () {
    await page.close();
  });

  //0.测试标题正确性
  it('should have correct title', async function() {
      expect(await page.title()).to.eql("wb's todo-List");
  })

  //1.测试新加的正确性（适配版）
  it('should new todo correctly', async function() {
    //点击输入框
    await page.click('#new-todo');

    //输入内容
    await page.type('#new-todo', 'new todo item');

    //点击add      
    //await page.keyboard.press("Enter");
    await page.click('#add-new-todo');
    await page.waitFor(500);
    let todoList = await page.waitFor('#todo-list');
    const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('span').textContent, todoList);
    expect(expectInputContent).to.eql('new todo item');

    // await page.waitFor(5000);
  }) 
  
  //2.测试渲染的正确性
  it('should display todo correctly', async function() {
    //默认有两个事件
    //获取todo-list ul, 其下还有两个初始ul，刚刚又新加了一个，所以现在应为3
    const list_length = await page.$$eval('#todo-list ul', e => e.length);
    //console.log(list_length - 1);
    expect(list_length).to.eql(3);
    await page.waitFor(500);
  })

  //3.测试完成的正确性
  it('should complete seccessfully', async function () {
    //根据我的代码结构（跨专业来的，，可能比较不科学）：
      //第'1'个事项的checkbox在 ID为todo-list下的ul下的 ul下的第'1'个孩子下的 li下的input上
    
    //1).点击第1个事件的完成checkbox
    await page.click('#todo-list > ul:nth-child(1) > li > input', { delay: 50 });
    
    //2).获取点击后的checkbox的checked的值
    const checkbox_Status1 = await page.$eval('#todo-list > ul:nth-child(1) > li > input', el => el.checked);
    const checkbox_Status2 = await page.$eval('#todo-list > ul:nth-child(2) > li > input', el => el.checked);
    //console.log(checkbox_Status1)
    //console.log(checkbox_Status2)
    // await page.waitFor(500);
    //3).默认为完成，现在应该为完成了
    expect(checkbox_Status1).to.eql(true);
    //默认为未完成，依旧为未完成
    expect(checkbox_Status2).to.eql(false);
    
    // await page.waitFor(5000);
  })


  //4.测试更新的正确性
  it('should update seccessfully', async function () {
  //1).往prompt弹框中输入新内容 new new todo item
  //设置弹框点击函数，在此处设置后，不管后续页面出现多少个弹框，都会默认点击确认。
  await page.on('dialog', async dialog => {
    await dialog.accept('new new todo item');
  });
    
  //2).点击第3个(新建)事件的更新按钮
  await page.click('#todo-list > ul:nth-child(3) > li > button.update-btn');

  await page.waitFor(500);
  //3).验证
  let todoList = await page.waitFor('#todo-list');
  const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('span').textContent, todoList);
  expect(expectInputContent).to.eql('new new todo item');
  
  // await page.waitFor(5000);
})

  //5.测试删除的正确性
  it('should delete seccessfully', async function () {
    //1).先获取第3个(新建)事件的内容
    const thirdInputContent = await page.$eval('#todo-list > ul:nth-child(3) > li > span', el => el.textContent);
    //console.log(thirdInputContent)
    //'new new todo item'
    
    //2).点击第3个(新建)事件的删除按钮
    await page.click('#todo-list > ul:nth-child(3) > li > button.delete-btn');
    await page.waitFor(500);
    //3).当前长度
    const list_length = await page.$$eval('#todo-list ul', e => e.length);
    //console.log(list_length);
    //2

    //4).获取当下所有的事件（名）
    var delete_flag = 1;
    const all_Content = await page.$$eval('#todo-list ul', ele=>{
      var dd = {};
      for(var i = 0; i < ele.length; i++){        
        dd[i] = ele[i].querySelector('span').textContent;
      }
      return dd;        
    });
    //存于all_Content中
    //console.log(all_Content);

    //5).遍历, 如果发现'new new todo item',置0
    for (var i = 0; i < list_length; i++){
      if (all_Content[i] === 'thirdInputContent') {
        delete_flag = 0;
        break;
      }
    }

    //console.log(delete_flag);
    expect(delete_flag).to.eql(1);
    
    // await page.waitFor(5000);
  })



});