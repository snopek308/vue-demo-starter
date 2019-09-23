var app = new Vue({
    // el: the DOM element to be replaced with a Vue instance
    el: '#app',
    // data: all the data for the app right away
    data: {
        newItem: {
            name: '',
            qty: 1,
            category: 'need'
        },
        shoppingList: [
            { name: 'Hammer', qty: 1, purchased: true, category: 'need' },
            { name: 'Nails', qty: 10, purchased: false, category: 'need'},
            { name: 'Sliding Compound Miter Saw', qty: 1, purchased: false, category: 'want'}
        ],
    },
    // methods: usually "events" triggered by v-on:
    //events that can manipulate data
    methods: {
        addIt: function(){
            //add item from object into the arrayLIst
            this.shoppingList.push(this.newItem);

            //clear the form
            this.newItem= {
                name: '',
                    qty: 1,
                    category: 'need'
            }

            //close the modal
            //(eventually this own't be in jQuery
            $('#addItemModal').modal('hide');
        },

        removeIt: function(item){
            //find element using indexOf, then remove one
            this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
        }
    },
    // computed: values that are updated and cached if dependencies change
    //cached results and only update if a change has been made
    //computed value functions need to return a value
    //treat these like regular values that you would see in data
    computed: {
        needList: function(){
             return this.shoppingList.filter(function (item) {
                 //return true if we want to keep this item
                 return !item.purchased && item.category === 'need';
             })
        },

        gotList: function(){
            return this.shoppingList.filter(function (item) {
                //return true if we want to keep this item
                return item.purchased;
            })
        },

        wantList: function(){
            return this.shoppingList.filter(function (item) {
                //return true if we want to keep this item
                return !item.purchased && item.category === 'want';
            })
        }
    },
    //mounted:  called after the instance has been mounted,
    //this is like document is ready
    mounted: function() {
        // put list from localStorage in the app if it exists
        if(localStorage.getItem('shoppingList')){
            this.shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
        }
    },
    // watch: calls the function if the value changes, call a function and do something
    // https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
    watch: {
        shoppingList: {
            //call this before the item changes
            handler: function(newList){
                //take this list and store it in local storage
                //newList is the list BEFORE it updates the model/view
                localStorage.setItem('shoppingList', JSON.stringify(newList));
            },

            //deep tells vue to watch nested properties as well
            deep: true
        }
    }
});