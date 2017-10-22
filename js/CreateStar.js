;(function() {
	var Star = (function(){
		Star.prototype.defaults = {
			el: '.star',
			max: 5,
			create: true,
			classIcon: 'fa',
			emptyClass: 'fa-star-o',
      		fullClass: 'fa-star',
      		clickColor:'#ffb600',
      		callback: null,
      		readOnly: true,
      		rating: void 0
		};

		function Star(el, option) {
			var self = this;
			this.elem = el;
			this.options = this.extend(option, this.defaults);
			this.rating = this.options.rating;
			this.readOnly = this.options.readOnly;
			this.max = this.options.max;
			if (this.options.create) {
				this.createStar();
			} else {
				this.max = this.getStar().length;
				this.syncStar();
			}
			this.syncRating();
			if (!this.readOnly) {
				return;
			}
			this.elem.addEventListener('click', function(e) {
				e.preventDefault();
				self.doCallback(e, self.setRating.bind(self));
				self.readOnly = false;
			});
			this.elem.addEventListener('mouseover', function(e) {
				self.doCallback(e, self.syncRating.bind(self));
			})
			this.elem.addEventListener('mouseout', function(e) {
				self.syncRating();
			})
		};

		Star.prototype.doCallback = function(e, callback) {
			if(!this.readOnly) {
				return;
			}
			var target = e.target, stars = this.getStar(), len;
			if(target.classList.contains(this.options.classIcon)) {
				for(var i = 0, len = stars.length; i < len; i++) {
					if(stars[i] == target) {
						callback(i + 1);
					}
				}
			}
		};

		Star.prototype.setColorClick = function() {
			var star = this.getStar();
			var len = this.rating;
			for(var i = 0; i < len; i++) {
				star[i].style.color = this.options.clickColor;
			}
		}

		Star.prototype.createStar = function() {
			var ref = this.max;
			for (var i = 0; i < ref; i++) {
				var link = document.createElement('a');
				link.setAttribute('href', '#');
				link.classList.add(this.options.classIcon)
				this.elem.appendChild(link);
			}
		};

		Star.prototype.getStar = function() {
			return this.elem.querySelectorAll('a');
		};

		Star.prototype.syncRating = function(rating) {
			var stars = this.getStar(), starRating = rating || this.rating, ref;
			for(var i = 1, ref = this.max; i <= ref; i++) {
				stars[i - 1].classList.remove(starRating >= i ? this.options.emptyClass : this.options.fullClass);
				stars[i - 1].classList.add(starRating >= i ? this.options.fullClass : this.options.emptyClass);
			}
		};

		Star.prototype.setRating = function(rating) {
			this.rating = rating;
			this.syncRating();
			this.setColorClick();
			if(this.options.callback != null) {
				this.options.callback(this.elem, rating);
			}
			return;
		};

		Star.prototype.extend = function(custom, defaults) {
			var key, value;
			for(key in defaults) {
				value = defaults[key]
				if(custom[key] == null){
					custom[key] = value;
				}
			}
			return custom;
		};
		Star.prototype.syncStar = function() {
			var star = this.getStar();
			var len = star.length;
			for(var i = 0; i < len; i++) {
				star[i].classList.add(this.options.classIcon)
			}
		}
		return Star;
	})();

	this.CreateStar = (function(){

		function CreateStar(options) {
			return this.init(options.el, options)
		};

		CreateStar.prototype.init = function (el, options){
			var elements = document.querySelectorAll(el), len;
			for(var i = 0, len = elements.length; i < len; i++) {
				var data = new Star(elements[i], options)
			};
		};
		return CreateStar;
	})()

}).call(this);