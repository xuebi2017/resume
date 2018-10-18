
!function() {
    var view = View('section.message');
    var model = Model({resourceName: 'Message'})
    var controller = Controller({
        messageList: null,
        messageForm: null,
        init(view, model) {
            this.messageList = view.querySelector('#messageList');
            this.messageForm = view.querySelector('#postMessageForm');
            console.log('this',this)
            this.loadMessages();            
        },
        loadMessages() {
            this.model.fetch().then((messages) => {
                console.log('messages', messages)
              var messageAll = messages.map((item, index, array) => {
                  return item.attributes
              })
              console.log(messageAll)
              var messageList = this.messageList;
              messageAll.forEach((item) => {
                  console.log('item', item)
                  var li = document.createElement('li')
                  li.textContent = `${item.name}: ${item.message}`
                  messageList.append(li)
              })
            })
        },
        bindEvents() {
            console.log('this.form', this.messageForm)
            this.messageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveMessage();
            })
        },
        saveMessage() {
            let myForm = this.messageForm;            
            let name = myForm.querySelector('input[name=name]').value
            let content = myForm.querySelector('input[name=content]').value
            console.log(content)
            this.model.save({name:name, message:content}).then(function(object) {
                // window.location.reload();    
                console.log('object', object)        
                var li = document.createElement('li')
                li.textContent = `${object.attributes.name}: ${object.attributes.message}`
                messageList.append(li)
                myForm.querySelector('input[name=content]').value = ''
            }, (error) => {
                alert('提交留言失败，请改天再试！')
            })
        }
    })
    // var controller = {
    //     view: null,
    //     messageList: null,
    //     messageForm: null,
    //     model: null,
    //     init: function(view, model) {
    //         this.view = view;
    //         this.model = model;
    //         this.messageList = view.querySelector('#messageList');
    //         this.messageForm = view.querySelector('#postMessageForm');
    //         this.model.init();
    //         this.loadMessages();
    //         this.bindEvents();
    //     },
    //     loadMessages() {
    //         this.model.fetch().then((messages) => {
    //             console.log('messages', messages)
    //           var messageAll = messages.map((item, index, array) => {
    //               return item.attributes
    //           })
    //           console.log(messageAll)
    //           var messageList = this.messageList;
    //           messageAll.forEach((item) => {
    //               console.log('item', item)
    //               var li = document.createElement('li')
    //               li.textContent = `${item.name}: ${item.message}`
    //               messageList.append(li)
    //           })
    //         })
    //     },
        // bindEvents() {
        //     this.messageForm.addEventListener('submit', (e) => {
        //         e.preventDefault();
        //         this.saveMessage();
        //     })
        // },
    //     saveMessage: function() {
    //         let myForm = this.messageForm;            
    //         let name = myForm.querySelector('input[name=name]').value
    //         let content = myForm.querySelector('input[name=content]').value
    //         console.log(content)
    //         this.model.save({name:name, message:content}).then(function(object) {
    //             // window.location.reload();    
    //             console.log('object', object)        
    //             var li = document.createElement('li')
    //             li.textContent = `${object.attributes.name}: ${object.attributes.message}`
    //             messageList.append(li)
    //             myForm.querySelector('input[name=content]').value = ''
    //         }, (error) => {
    //             alert('提交留言失败，请改天再试！')
    //         })
    //     }
    // };
    controller.init(view, model)
}.call()
