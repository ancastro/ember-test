var App = Ember.Application.create({ });

App.Router.map(function(){
	this.route('about', {path: '/aboutus'});
	this.route('credits');
	this.resource('products', function(){
		this.resource('product', { path: '/:product_id' });
	});
	
});

App.ProductsRoute = Ember.Route.extend({
	model: function(){
		return this.store.findAll('product');
	}
});

App.ProductRoute = Ember.Route.extend({
	model: function(params){
		return this.store.find('product', params.product_id);
	}
});

App.IndexController = Ember.Controller.extend({
	productsCount: 6,
	logo: 'images/logo.png',
	time: function(){
		return(new Date()).toDateString();
	}.property()
});

App.AboutController = Ember.Controller.extend({
	contactName: 'Andrew',
	open: function(){
		var currentDay = (new Date()).getDay();
		if (currentDay == 0) {
			return "closed";
		} else {
			return "open";
		}
	}.property()
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Product = DS.Model.extend({
	title: DS.attr('string'),
	price: DS.attr('number'),
	description: DS.attr('string'),
	isOnSale: DS.attr('boolean'),
	image: DS.attr('string'),
	review: DS.hasMany('review', {async: true})
});

App.Product.FIXTURES = [
	{
		id: 1,
		title: 'Flint',
		price: 99,
		description: 'Flint is...',
		isOnSale: true,
		image: 'flint.png'
	},
	{
		id: 2,
		title: 'Kindling',
		price: 249,
		description: 'Easily...',
		isOnSale: false,
		image: 'kindling.png'
	}
];

App.Review = DS.Model.extend({
	text: DS.attr('string'),
	reviewedAt: DS.attr('date'),
	product: DS.belongsTo('product')
});