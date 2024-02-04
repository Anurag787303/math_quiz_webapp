import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import './Select.css';
import selectImgLeft from '../Assets/select-image.png';
import { getCurrentExercise } from '../../helpers';

const Select = () => {
  // State for question 1
  let exercise = getCurrentExercise();
  let answers = JSON.parse(localStorage.getItem('answers'));

  const [selectedOptionQ1, setSelectedOptionQ1] = useState(null);
  const [backgroundColorQ1, setBackgroundColorQ1] = useState('#D3FFE7');

  // State for question 2
  const [selectedOptionQ2, setSelectedOptionQ2] = useState(null);
  const [backgroundColorQ2, setBackgroundColorQ2] = useState('#D3FFE7');

  useEffect(() => {
    const firstParentElement = document.querySelector('.Q1')
    const secondParentElement = document.querySelector('.Q2')
    exercise = getCurrentExercise()
    answers = JSON.parse(localStorage.getItem('answers'))

    if (answers.t1.q1) {
      setSelectedOptionQ1(`Q1-option${answers.t1.q1[0] + 1}`)
      setBackgroundColorQ1('#08603B');
    }

    if (answers.t1.q2) {
      setSelectedOptionQ2(`Q2-option${answers.t1.q2[0] + 1}`)
      setBackgroundColorQ2('#604C08');
    }

  }, [])

  // Function to handle option selection and color change for question 1
  const handleColorChangeQ1 = (id) => {
    if (selectedOptionQ1 === id) {
      // Deselect the same option and reset color
      setSelectedOptionQ1(null);
      answers.t1.q1 = null
      setBackgroundColorQ1('#D3FFE7');
    } else {
      // Set the newly selected option and change color
      setSelectedOptionQ1(id);
      answers.t1.q1 = [parseInt(id[9]) - 1, exercise.t1.q1[parseInt(id[9]) - 1]]
      setBackgroundColorQ1('#08603B');
    }

    localStorage.setItem('answers', JSON.stringify(answers))
  };



  // Function to handle option selection and color change for question 2
  const handleColorChangeQ2 = (id) => {
    if (selectedOptionQ2 === id) {
      // Deselect the same option and reset color
      setSelectedOptionQ2(null);
      answers.t1.q2 = null
      setBackgroundColorQ2('#D3FFE7');
    } else {
      // Set the newly selected option and change color
      setSelectedOptionQ2(id);
      answers.t1.q2 = [parseInt(id[9]) - 1, exercise.t1.q2[parseInt(id[9]) - 1]]
      setBackgroundColorQ2('#604C08');
    }

    localStorage.setItem('answers', JSON.stringify(answers))
  };

  return (
    <Layout activityName={"SELCET THE SMALLEST NUMBER"} taskNumber={1}>
      <div className='select-body'>
        <div className='select-image'><img src={selectImgLeft} alt="select" /></div>
        <div className='content'>
          <div className='Q1'>
            <div className={`option ${selectedOptionQ1 === 'Q1-option1' ? 'selected' : ''}`} id='Q1-option1' style={{ backgroundColor: selectedOptionQ1 === 'Q1-option1' ? backgroundColorQ1 : '#D3FFE7' }} onClick={() => handleColorChangeQ1('Q1-option1')}>{exercise.t1.q1[0]}</div>
            <div className='join'></div>
            <div className={`option ${selectedOptionQ1 === 'Q1-option2' ? 'selected' : ''}`} id='Q1-option2' style={{ backgroundColor: selectedOptionQ1 === 'Q1-option2' ? backgroundColorQ1 : '#D3FFE7' }} onClick={() => handleColorChangeQ1('Q1-option2')}>{exercise.t1.q1[1]}</div>
            <div className='join'></div>
            <div className={`option ${selectedOptionQ1 === 'Q1-option3' ? 'selected' : ''}`} id='Q1-option3' style={{ backgroundColor: selectedOptionQ1 === 'Q1-option3' ? backgroundColorQ1 : '#D3FFE7' }} onClick={() => handleColorChangeQ1('Q1-option3')}>{exercise.t1.q1[2]}</div>
            <div className='join'></div>
            <div className={`option ${selectedOptionQ1 === 'Q1-option4' ? 'selected' : ''}`} id='Q1-option4' style={{ backgroundColor: selectedOptionQ1 === 'Q1-option4' ? backgroundColorQ1 : '#D3FFE7' }} onClick={() => handleColorChangeQ1('Q1-option4')}>{exercise.t1.q1[3]}</div>
          </div>
          <div className='Q2'>
            <div className={`option ${selectedOptionQ2 === 'Q2-option1' ? 'selected' : ''}`} id='Q2-option1' style={{ backgroundColor: selectedOptionQ2 === 'Q2-option1' ? backgroundColorQ2 : '#D3FFE7' }} onClick={() => handleColorChangeQ2('Q2-option1')}>{exercise.t1.q2[0]}</div>
            <div className='join'></div>
            <div className={`option ${selectedOptionQ2 === 'Q2-option2' ? 'selected' : ''}`} id='Q2-option2' style={{ backgroundColor: selectedOptionQ2 === 'Q2-option2' ? backgroundColorQ2 : '#D3FFE7' }} onClick={() => handleColorChangeQ2('Q2-option2')}>{exercise.t1.q2[1]}</div>
            <div className='join'></div>
            <div className={`option ${selectedOptionQ2 === 'Q2-option3' ? 'selected' : ''}`} id='Q2-option3' style={{ backgroundColor: selectedOptionQ2 === 'Q2-option3' ? backgroundColorQ2 : '#D3FFE7' }} onClick={() => handleColorChangeQ2('Q2-option3')}>{exercise.t1.q2[2]}</div>
            <div className='join'></div>
            <div className={`option ${selectedOptionQ2 === 'Q2-option4' ? 'selected' : ''}`} id='Q2-option4' style={{ backgroundColor: selectedOptionQ2 === 'Q2-option4' ? backgroundColorQ2 : '#D3FFE7' }} onClick={() => handleColorChangeQ2('Q2-option4')}>{exercise.t1.q2[3]}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Select;
