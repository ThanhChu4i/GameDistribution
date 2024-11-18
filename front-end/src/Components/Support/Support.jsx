import React from 'react';
import './Support.css';

const Support = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    // Thêm logic xử lý form tại đây
  };

  return (
    <div className="Support-page">
      <div className="Support-form">
        <div className="Support-form-title">
          <h1>Contact GameDistribution</h1>
        </div>
        <div className="form-container">
          <div onSubmit={handleSubmit} className='container-form'>
            <div className='left-form-group'>

              <div className="form-group">
                <label htmlFor="name">Your name</label>
                <input type="name" id="name" placeholder="John" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your email address</label>
                <input type="email" id="email" placeholder="email@gmail.com" required />
              </div>

              <div className="form-group-button-support">
                <label>Please choose a category for your inquiry</label>
                <div className="categories">
                  <button className='category'>NEW PUBLISHER</button>
                  <button className='category'>GAME ACTIVATION</button>
                  <button className='category'>FINANCE</button>
                  <button className='category'>TECHNICAL</button>
                  <button className='category'>GAME BUG REPORT</button>
                  <button className='category'>BUSINESS OPPORTUNITIES</button>
                  <button className='category'>SITE BUILDER</button>
                  <button className='category'>GENERAL</button>
                </div>
                <div className="faq">
                  <p>Have you checked out our FAQ pages?</p>
                  <a href="#">For Developers - For Publishers</a>
                </div>
              </div>
              </div>
              <div className='right-form-group'>
                <div className="form-group-left">
                  <label htmlFor="inquiry">Please tell us more about your inquiry</label>
                  <textarea
                    id="inquiry"
                    placeholder="Please also include your Developer or Publisher name. If your question concerns a specific game, please add the game name and GameID as well."
                    required
                  ></textarea>
                </div>

                <div className="form-group file-upload">
                  <input type="file" id="file-upload" />
                </div>



                <div className="form-group-for-Support">
                  <button className="submit-btn-for-support" >Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Support;
