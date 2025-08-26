<?php
add_action( 'wp_enqueue_scripts', function() {
    // Enqueue parent CSS
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

    // Enqueue child compiled CSS
    wp_enqueue_style(
        'child-style',
        get_stylesheet_directory_uri() . '/assets/dist/style.min.css',
        array('parent-style'),
    );

    // Enqueue child compiled JS
    wp_enqueue_script(
        'child-script',
        get_stylesheet_directory_uri() . '/assets/dist/custom.min.js',
        array('jquery'),
        filemtime(get_stylesheet_directory() . '/assets/dist/custom.min.js'),
        true
    );
});

// wp_enqueue_scripts gets triggered by WordPress when it’s time to load CSS and JS files.
// wp_enqueue_style=>  Add this CSS file to the page when rendering.
//  get_template_directory_uri() . '/style.css' =>  This builds the URL of the parent theme’s style.css file.
// array('parent-style') => “Do not load child-style until parent-style has been loaded first.”


//why not justt use link or src tag ?
// Files may load twice if a plugin uses the same one.
// You can’t control order (maybe JS loads before jQuery → error).