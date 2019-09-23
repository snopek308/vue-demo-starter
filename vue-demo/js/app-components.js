Vue.component('list', {
    props: {
        items: {
            type: Array,
            required: true
        },
        name: {
            type: String,
            default: "Get It"
        }
    },

    methods: {
        add: function(item){
            item.qty++;
        },

        //subtract: function(item){}
        //subtract: (item)=>

        subtract: function(item){
            item.qty--;

            //remove if qty is zero
            if(item.qty <= 0){
                //emit an event that the parent component catches
                this.$emit('remove-item', item);

                //STOP! DOn't DO THIS!
                //app.removeIt(item);
            }

        },
    },

    //change from '' to `` so it doesn't need to be concatenated into parsed strings
    template: `<div class="get-it-list">
                <h3>{{name}}</h3>
                <ul class="list-group list-group-flush">
                    <li v-for="(item, i) in items" :key="item.name" class="list-group-item">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" :id="name + '-' + i" v-model="item.purchased" class="custom-control-input">
                            <label :for="name + '-' + i" class="custom-control-label">{{item.name}}</label>
                        </div>
                        <div class=" d-flex justify-content-between">
                            <div>
                                <small>{{item.qty}}</small>
                            </div>
                            <div>
                                <button class="btn btn-tiny" @click="add(item)"><i class="fas fa-plus-circle"></i></button>
                                <button class="btn btn-tiny" @click="subtract(item)"><i class="fas fa-minus-circle"></i></button>
                            </div>
                        </div>
                    </li>
                </ul>
                <p>
                    <small>Total: {{items.length}}</small>
                </p>
            </div>`,

    computed: {

    }
});