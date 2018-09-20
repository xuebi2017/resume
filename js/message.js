
!function() {
    var view = document.querySelector('section.message');
    var model = {
        init: function() {
            var APP_ID = 'HhEuKxMOUvcurXcUSROh8N3s-gzGzoHsz';
            var APP_KEY = 'RNnAQNMKDhE8slfyWm8HTUtA';
            AV.init({
              appId: APP_ID,
              appKey: APP_KEY
            });
        },
        fetch: function() {
            var query = new AV.Query('Message');
            return query.find()  //promise对象
        },
        save: function(name, content) {
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                name: name,
                message: content,
            })  //promise对象
        }
    }
    var controller = {
        view: null,
        messageList: null,
        messageForm: null,
        model: null,
        init: function(view, model) {
            this.view = view;
            this.model = model;
            this.messageList = view.querySelector('#messageList');
            this.messageForm = view.querySelector('#postMessageForm');
            this.model.init();
            this.loadMessages();
            this.bindEvents();
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
            this.messageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveMessage();
            })
        },
        saveMessage: function() {
            let myForm = this.messageForm;            
            let name = myForm.querySelector('input[name=name]').value
            let content = myForm.querySelector('input[name=content]').value
            console.log(content)
            this.model.save(name, content).then(function(object) {
                // window.location.reload();            
                var li = document.createElement('li')
                li.textContent = `${object.attributes.name}: ${object.attributes.message}`
                messageList.append(li)
                myForm.querySelector('input[name=content]').value = ''
            }, (error) => {
                alert('提交留言失败，请改天再试！')
            })
        }
    };
    controller.init(view, model)
}.call()
