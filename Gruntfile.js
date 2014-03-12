module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*script uglified*/\n'
      },
      build: {
        src: ['js/script.js', 'js/cookie.js'],
        dest: 'build/script.min.js'
      }
    }
  });

  // Load the plugin with the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
