import React, { useState } from 'react';
import './App.css';

export default function HealthForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    disease: '',
    heartCondition: '',
    pregnant: '',
    pregnancySymptoms: [],
    childStatus: '',
    childIssues: []
  });

  const diseaseOptions = [
    'Malaria', 'Typhoid', 'Diarrhea', 'Rabies', 'HIV', 'Jaundice',
    'Tuberculosis', 'Cancer', 'Heart', 'Chicken Pox', 'Coronavirus'
  ];

  const heartOptions = ['Low BP', 'High BP'];
  const pregnancySymptomsOptions = [
    'Painful Body', 'Rashes on Stomach', 'Skin Issues', 'Itching or Irritating',
    'Headache', 'Vomiting', 'Cough', 'Swelling of Hands and Legs', 'Heavy Body'
  ];

  const childIssuesOptions = [
    'Frequent Disease', 'Illness', 'Allergy', 'Infection', 'Diarrhea', 'Fever',
    'No Activity', 'No Response from Child', 'Heavy Weight of Mother',
    'Stressful or Anxious Behavior', 'Skin Issues'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (pregnancySymptomsOptions.includes(value)) {
        setFormData(prev => ({
          ...prev,
          pregnancySymptoms: checked
            ? [...prev.pregnancySymptoms, value]
            : prev.pregnancySymptoms.filter(item => item !== value)
        }));
      } else if (childIssuesOptions.includes(value)) {
        setFormData(prev => ({
          ...prev,
          childIssues: checked
            ? [...prev.childIssues, value]
            : prev.childIssues.filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-gradient-to-br from-green-100 via-pink-100 to-purple-100 rounded-2xl shadow-2xl space-y-6">
      <h2 className="text-3xl font-bold text-center text-green-700">Health Check Form</h2>

      <input className="w-full p-2 border rounded border-pink-300 bg-white" name="name" placeholder="Name" onChange={handleChange} />
      <input className="w-full p-2 border rounded border-purple-300 bg-white" name="address" placeholder="Address" onChange={handleChange} />
      <input className="w-full p-2 border rounded border-green-300 bg-white" name="phone" placeholder="Phone Number" onChange={handleChange} />

      <div className="space-y-2">
        <label className="block text-left font-medium text-purple-800">Gender</label>
        <div className="flex space-x-4">
          <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
        </div>
      </div>

      <input className="w-full p-2 border rounded border-pink-300 bg-white" type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input className="w-full p-2 border rounded border-purple-300 bg-white" name="height" placeholder="Height" onChange={handleChange} />
      <input className="w-full p-2 border rounded border-green-300 bg-white" name="weight" placeholder="Weight" onChange={handleChange} />

      <label className="block font-medium text-purple-800">Disease</label>
      <select name="disease" onChange={handleChange} className="w-full p-2 border rounded border-pink-300 bg-white">
        <option value="">Select Disease</option>
        {diseaseOptions.map(d => <option key={d} value={d}>{d}</option>)}
      </select>

      {formData.disease === 'Heart' && (
        <>
          <label className="block font-medium text-purple-800">Heart Condition</label>
          <select name="heartCondition" onChange={handleChange} className="w-full p-2 border rounded border-green-300 bg-white">
            <option value="">Select</option>
            {heartOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </>
      )}

      <label className="block font-medium text-purple-800">Are you pregnant?</label>
      <select name="pregnant" onChange={handleChange} className="w-full p-2 border rounded border-pink-300 bg-white">
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      {formData.pregnant === 'Yes' && (
        <div className="space-y-2">
          <label className="block font-medium text-purple-800">Symptoms</label>
          {pregnancySymptomsOptions.map(symptom => (
            <label key={symptom} className="block">
              <input type="checkbox" value={symptom} checked={formData.pregnancySymptoms.includes(symptom)} onChange={handleChange} /> {symptom}
            </label>
          ))}
        </div>
      )}

      {formData.pregnant === 'No' && (
        <>
          <label className="block font-medium text-purple-800">Do you have a child?</label>
          <select name="childStatus" onChange={handleChange} className="w-full p-2 border rounded border-green-300 bg-white">
            <option value="">Select</option>
            <option value="1 Year">1 Year Old</option>
            <option value="2 Year">2 Year Old</option>
            <option value="< 1 Year">Less than 1 Year</option>
            <option value="No Child">No Child</option>
          </select>

          {(formData.childStatus === '1 Year' || formData.childStatus === '2 Year' || formData.childStatus === '< 1 Year') && (
            <div className="space-y-2">
              <label className="block font-medium text-purple-800">Child Issues</label>
              {childIssuesOptions.map(issue => (
                <label key={issue} className="block">
                  <input type="checkbox" value={issue} checked={formData.childIssues.includes(issue)} onChange={handleChange} /> {issue}
                </label>
              ))}
            </div>
          )}

          {formData.childStatus === 'No Child' && (
            <label className="block text-purple-800">
              <input type="checkbox" /> No Child, No Pregnant
            </label>
          )}
        </>
      )}

      <button className="bg-gradient-to-r to-green-500 text-white px-6 py-2 rounded-full shadow-md hover:from-black hover:to-green-600">Submit</button>
    </div>
  );
}
