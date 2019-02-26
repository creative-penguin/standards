'use strict';

const wrap = require('word-wrap'),
      map = require('lodash.map'),
      longest = require('longest'),
      rightPad = require('right-pad'),
      conventionalCommitTypes = require('conventional-commit-types');


// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
function engine(options) {

   const types = options.types,
         length = longest(Object.keys(types)).length + 1;

   const choices = map(types, function(type, key) {
      return {
         name: rightPad(key + ':', length) + ' ' + type.description,
         value: key,
      };
   });

   return {
      // When a user runs `git cz`, prompter will
      // be executed. We pass you cz, which currently
      // is just an instance of inquirer.js. Using
      // this you can ask questions and get answers.
      //
      // The commit callback should be executed when
      // you're ready to send back a commit template
      // to git.
      //
      // By default, we'll de-indent your commit
      // template and will keep empty lines.
      prompter: function(cz, commit) {
         console.log('\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n');

         // Let's ask some questions of the user
         // so that we can populate our commit
         // template.
         //
         // See inquirer.js docs for specifics.
         // You can also opt to use another input
         // collection library if you prefer.
         const PROMPTS = [
            {
               type: 'list',
               name: 'type',
               message: 'Select the type of change that you\'re committing:',
               choices: choices,
               default: options.defaultType,
            },
            {
               type: 'input',
               name: 'scope',
               message: 'What is the scope of this change (e.g. component or file name)? (press enter to skip)\n',
               default: options.defaultScope,
            },
            {
               type: 'input',
               name: 'subject',
               message: 'Write a short, imperative tense description of the change:\n',
               default: options.defaultSubject,
            },
            {
               type: 'input',
               name: 'issue',
               message: 'Add issue reference (e.g. "#123"): (press enter to skip)\n',
               default: options.defaultIssues ? options.defaultIssues : undefined,
            },
            {
               type: 'input',
               name: 'body',
               message: 'Provide a longer description of the change: (press enter to skip)\n',
               default: options.defaultBody,
            },
            {
               type: 'confirm',
               name: 'isBreaking',
               message: 'Are there any breaking changes?',
               default: false,
            },
            {
               type: 'input',
               name: 'breaking',
               message: 'Describe the breaking changes:\n',
               when: function(answers) {
                  return answers.isBreaking;
               },
            },
         ];

         cz.prompt(PROMPTS)
            .then(function(answers) {
               let breaking = answers.breaking ? answers.breaking.trim() : '';

               const maxLineWidth = 100,
                     scope = answers.scope.trim() ? '(' + answers.scope.trim() + ')' : '',
                     issue = answers.issue ? ` (${answers.issue})` : '',
                     // Hard limit this line
                     head = (answers.type + scope + ': ' + answers.subject.trim()).slice(0, maxLineWidth) + issue;

               const wrapOptions = {
                  trim: true,
                  newline: '\n',
                  indent: '',
                  width: maxLineWidth,
               };

               // Wrap these lines at 100 characters
               const body = wrap(answers.body, wrapOptions);

               breaking = breaking ? `\n\nBREAKING CHANGE: ${breaking.replace(/^BREAKING CHANGE: /, '')}` : '';
               breaking = wrap(breaking, wrapOptions);

               commit(head + '\n\n' + body + breaking);
            });
      },
   };
}

module.exports = engine({
   types: conventionalCommitTypes.types,
   defaultType: process.env.CZ_TYPE,
   defaultScope: process.env.CZ_SCOPE,
   defaultSubject: process.env.CZ_SUBJECT,
   defaultBody: process.env.CZ_BODY,
   defaultIssues: process.env.CZ_ISSUES,
});
