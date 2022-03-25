<?php

// Write Visitor-Side Markup
function write_markup($id)
{
  // Get Employee By Id
  $employee = new WP_Query(array(
    'post_type' => 'employee',
    'p' => $id,
  ));

  // WP Loop
  while ($employee->have_posts()) {
    $employee->the_post();

    // Output Buffer
    ob_start(); ?>
    <div class="employee-callout">
      <div class="employee-callout__photo" style="background-image: url(<?php the_post_thumbnail_url('thumbnail') ?>)"></div>
      <div class="employee-callout__text" style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <h5><?php the_field('employee_name'); ?></h5>
        <div>Position: <?php the_field('employee_position') ?></div>
        <div class="employee-callout__description">
          <span class="employee-callout__github"></span>
          Description: <?php the_field('employee_description') ?>
        </div>
        <div class="employee-callout__link-grid">
          <div><span class="employee-callout__dashicons dashicons dashicons-editor-code"></span> <a href="<?php the_field('github_link') ?>"><?php the_field('github_link') ?></a></div>
          <div><span class="employee-callout__dashicons dashicons dashicons-linkedin linkedin-color"></span> <a href="<?php the_field('linkedin_link') ?>"><?php the_field('linkedin_link') ?></a></div>
          <div><span class="employee-callout__dashicons dashicons dashicons-xing xing-color"></span> <a href="<?php the_field('xing_link') ?>"><?php the_field('xing_link') ?></a></div>
          <div><span class="employee-callout__dashicons dashicons dashicons-facebook fb-color"></span> <a href="<?php the_field('facebook_link') ?>"><?php the_field('facebook_link') ?></a></div>
        </div>
      </div>
    </div>
<?php
    // Reset Data
    wp_reset_postdata();

    // Return Clean HTML
    return ob_get_clean();
  }
}
