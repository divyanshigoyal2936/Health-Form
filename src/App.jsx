import React, { useState } from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const GenderSelect = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center  h-screen bg-gradient-to-r from-purple-300 to-blue-300">
      <h1 className="text-5xl font-bold mb-8">Choose Your Gender</h1>
      <div className="flex gap-12">
        <div onClick={() => navigate('/form/woman')} className="cursor-pointer w-full">
          <img src="/women-removebg-preview.png" alt="Woman" className=" h-full rounded-xl shadow-xl hover:scale-105 transition-transform duration-300" />
          <p className="text-center mt-4 font-semibold text-3xl">FEMALE</p>
        </div>
        <div onClick={() => navigate('/form/man')} className="cursor-pointer w-full">
          <img src="/men.png" alt="Man" className=" h-full rounded-xl shadow-xl hover:scale-105 transition-transform duration-300" />
          <p className="text-center mt-4 font-semibold text-3xl">MALE</p>
        </div>
      </div>
    </div>
  );
};

const FormTemplate = ({ gender }) => {
  const [formData, setFormData] = useState({
    name: '', age: '', weight: '', height: '',
    location: '', income: '', dietType: '',
    foodAvailability: [], healthIssues: [],
    ...(gender === 'woman' && { pregnant: '' })
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : prev[name].filter(item => item !== value),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data:', formData);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{gender === 'woman' ? 'Women' : 'Men'} Health Info Form</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} className="w-full p-2 border rounded" required />

        <select name="location" onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Location</option>
          <option value="">Uttar Pradesh</option>
        </select>

        <input type="number" name="income" placeholder="Monthly Income" onChange={handleChange} className="w-full p-2 border rounded" required />

        <div>
          <label className="block font-semibold mb-1">Food Availability</label>
          {['Dal', 'Roti', 'Spinach', 'Jaggery', 'Milk'].map(item => (
            <label key={item} className="block">
              <input type="checkbox" name="foodAvailability" value={item} onChange={handleChange} /> {item}
            </label>
          ))}
        </div>

        <div>
          <label className="block font-semibold mb-1">Diet Type</label>
          <select name="dietType" onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1 ">Health Issues</label>
          <label><input type="text" placeholder="healthIssues" value="" className="p-2 w-full border rounded"onChange={handleChange} /></label>
        </div>

        {gender === 'woman' && (
          <div>
            <label className="block font-semibold mb-1">Are you pregnant?</label>
            <select name="pregnant" onChange={handleChange} className="w-full p-2 border rounded" required>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="yes">have a child (1 or 2yr old)</option>

            </select>
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<GenderSelect />} />
      <Route path="/form/woman" element={<FormTemplate gender="woman" />} />
      <Route path="/form/man" element={<FormTemplate gender="man" />} />
    </Routes>
  </Router>
);

export default App;
