# Quick Question Plugin

- Version: 1.0.0
- Project Type: WordPress Plugin
- Author: Steven Clements
- Description: Provides site visitors with multiple-choice questions customized on the WordPress editor screen.

## Summary

This application leverages a PHP callback to return HTML for dynamic editing and uses React components and JSX. No additional dependencies are necessary other than the @wordpress/components and /block-editor libraries.

Default behavior is to lock the update button unless a correct answer has been selected. Hint is hidden by default and the hint text will only be removed if the post is updated.

## Getting Started

1. Click on the Plugins link from the WordPress editor screen to open a list of all plugins on your site.
2. Be sure to activate the Quick Question Plugin.
3. Navigate to a post or page where you wish to implement.
4. Search for Quick Question in the Add Block screen and select it to add it to the resource.
5. Enter the question and answers you wish to use for the particular block.
6. Click the blue circle next to the correct answer. Note: You will not be able to save or update your post until a correct answer is selected.
7. Continue writing the post normally and save upon completion.

## Public View

Once a Quick Question block is set up, users will be presented with the question and answer options. Correct and incorrect selections are displayed elegantly with CSS. The default behavior is to allow the site visitor an unlimited number of guesses.

## Features

- Optional Hint: The "Add a Hint" button can be used to provide your site visitors with clues to the correct answer. You can click "Remove a Hint" to remove this feature for the particular question.
- Add an Answer: The "Add Answer" button can be used to add additional answer options to the question.
- Remove an Answer: Click the "Delete" button next to the corresponding answer to delete it.
