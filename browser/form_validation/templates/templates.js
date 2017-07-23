(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['form_template'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form method=\"post\" action=\"/\" class=\"";
  if (helper = helpers.formClass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.formClass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n  <p>\n    <label for=\"email\">Email</label>\n    <input type=\"text\" name=\"email\" id=\"email\">\n  </p>\n  <p>\n    <label for=\"password\">Password</label>\n    <input type=\"password\" name=\"password\" id=\"password\">\n  </p>\n  <input type=\"submit\" value=\"Sign up\">\n</form>\n\n";
  return buffer;
  });
})();
