(function() {
    console.log('applying test overrides', $, jQuery);
    $.ajax = function() {
        // console.log('$.ajax called and overriden', arguments);
        var response = {
            done: function() {
                return this;
            },

            then: function() {
                return this;
            },

            always: function() {
                return this;
            },

            fail: function() {
                return this;
            }
        };
        return response;
    }
})();
