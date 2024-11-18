import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSubmitMessageMutation } from '../../redux/features/message/messageApi';
// Import the RTK Query hook

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');
  const { user } = useSelector((state) => state.auth); // Get user data from Redux
  const navigate = useNavigate();

  const [submitMessage, { isLoading, isError, error }] = useSubmitMessageMutation(); // Use RTK Query mutation hook

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to send a message.');
      return navigate('/login'); // Redirect to login if the user is not logged in
    }
    
      
      

    try {
      const response = await submitMessage({ ...formData, userId: user.id }).unwrap(); // Submit the form data
      console.log("fr",response);
      setFormStatus('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Clear the form
    } catch (err) {
      setFormStatus('Error sending message. Please try again later.');
      console.log("formdata:",formData);
     
      

    }
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Contact Us</h2>
      </section>

      <div className="container mx-10 px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Form Section */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            {user ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-medium">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            ) : (
              <p className="text-lg font-medium text-red-600">
                You need to log in to send a message.{' '}
                <a href="/login" className="text-blue-500">Log in here</a>.
              </p>
            )}

            {formStatus && (
              <p className={`mt-4 ${formStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {formStatus}
              </p>
            )}
          </div>

          {/* Location Section (Optional) */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Our Location</h3>
            <div className="space-y-4">
              <p className="text-lg">You can find us at:</p>
              <address className="text-lg font-semibold">
                JK Lakshmipat University
              </address>
              <div className="h-64 bg-gray-200 rounded-lg" style={{ width: '80%' }}>
                {/* You can embed Google Maps iframe here */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.12067690575!2d75.64765407526883!3d26.83611377669295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4af4fe68f403%3A0x3bf05f95df22b8c4!2sJK%20Lakshmipat%20University!5e0!3m2!1sen!2sin!4v1731948072924!5m2!1sen!2sin" // Google Maps embed URL
                  width="100%"
                  height="100%"
                  style={{ border: '0', borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
