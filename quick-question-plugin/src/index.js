import './index.scss';
import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, PanelRow, ColorPicker } from '@wordpress/components';
import { InspectorControls, BlockControls, AlignmentToolbar } from "@wordpress/block-editor";

function quickQuestionStart() {
  let lockUpdate = false;
  
  wp.data.subscribe(function() {
    const checkBlocks = wp.data.select('core/block-editor').getBlocks().filter(function(block) {
      return block.name == 'sccdomain/quickquestionplugin' && block.attributes.correct == undefined;
    });

    if (checkBlocks.length && lockUpdate == false) {
      lockUpdate = true;
      wp.data.dispatch('core/editor').lockPostSaving('invalidanswer');
    }
    
    if (!checkBlocks.length && lockUpdate == true) {
      lockUpdate = false;
      wp.data.dispatch('core/editor').unlockPostSaving('invalidanswer');
    }
  })
}

quickQuestionStart();

wp.blocks.registerBlockType('sccdomain/quickquestionplugin', {
  title: 'Insert Quick Question',
  description: 'Provide multiple-choice answers to custom questions on any page. Great for one-question surveys and checking reader retention.',
  icon: 'clipboard',
  category: 'common',
  attributes: {
    question: {type: "string"},
    answers: {type: "array", default: [""]},
    hint: {type: "string", default: null},
    hidden: {type: "boolean", default: true},
    correct: {type: "number", default: undefined},
    background: {type: "string", default: "#eaecff"},
    alignment: {type: 'string', default: 'left'}
  },
  example: {
    attributes: {
      question: "What is my favorite color?",
      answers: ['Red', 'Yellow', 'Blue', 'Black'],
      hint: 'It rhymes with bed!',
      hidden: true,
      correct: 'Red',
      background: '#eaecff',
      alignment: 'left'
    }
  },
  edit: EditComponent,
  save: function (props) {return null}
});

function EditComponent(props) {
  function updateQuestion(value) {
    props.setAttributes({question: value});
  }

  function updateHint(value) {
    props.setAttributes({hint: value});
  }

  function markCorrect(index) {
    props.setAttributes({correct: index});
  }

  function deleteAnswer(deleteIndex) {
    const newAnswers = props.attributes.answers.filter(function(x, index) {
      return index != deleteIndex;
    })
    props.setAttributes({answers: newAnswers});

    if (deleteIndex == props.attributes.correct) {
      props.setAttributes({correct: undefined});
    }
  }

  return (
    <div className="questionEditor" style={{ background: props.attributes.background, textAlign: props.attributes.alignment }}>
      
      <BlockControls>
        <AlignmentToolbar value={props.attributes.alignment} onChange={e => props.setAttributes({ alignment: e })} />
      </BlockControls>

      <InspectorControls>
        <PanelBody title="Background Color" initialOpen={true}>
          <PanelRow>
            <ColorPicker color={props.attributes.background} onChangeComplete={e => props.setAttributes({background: e.hex})} disableAlpha={true} />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <div className={"questionFlex"} >
            <Icon className="mainIcon" icon="clipboard" />
            <h3 className="questionMargin">Quick Question</h3>
      </div>
      <TextControl style={{textAlign: props.attributes.alignment}} value={props.attributes.question} onChange={updateQuestion} />
      
      <h3>Answers:</h3>
      {props.attributes.answers.map(function (answer, index) {
        return (
          <div>
            <Flex style={{textAlign: props.attributes.alignment}}>
              <FlexBlock>
                <TextControl autoFocus={ answer == undefined } value={answer} style={{textAlign: props.attributes.alignment}} onChange={inputValue => {
                  const newInput = props.attributes.answers.concat([]);
                  newInput[index] = inputValue;
                  props.setAttributes({ answers: newInput })
                }} />
              </FlexBlock>
              <FlexItem>
                <Button onClick={() => markCorrect(index) }>
                  <Icon className={props.attributes.correct == index ? "answerCorrect" : "answerDefault"} icon={props.attributes.correct == index ? "yes" : "marker"} />
                </Button>
              </FlexItem>
              <FlexItem>
              <Button className='answerDelete' onClick={() => deleteAnswer(index)}>
                  Delete
                </Button>
              </FlexItem>
            </Flex>
          </div>
        )
      })}

        <h6 className={props.attributes.hidden == true ? "hintHidden" : "hintShown"}>Hint:</h6>
        <TextControl style={{textAlign: props.attributes.alignment}} value={props.attributes.hint} onChange={updateHint} className={props.attributes.hidden == true ? "hintHidden" : undefined} />

        <Button isPrimary className="buttonMargin" onClick={() => {
          props.setAttributes({ answers: props.attributes.answers.concat([undefined]) })
        }}>Add New Answer</Button>

        <Button isSecondary className={props.attributes.hidden == false ? "hintHidden" : undefined} onClick={() => props.setAttributes({hidden: false})}>
          Add Hint
        </Button>

        <Button isDestructive className={props.attributes.hidden == true ? "hintHidden": undefined} onClick={() => {
          props.setAttributes({hidden: true})
          updateHint(null);
        }}>
          Remove Hint
        </Button>
    </div>
  );
}