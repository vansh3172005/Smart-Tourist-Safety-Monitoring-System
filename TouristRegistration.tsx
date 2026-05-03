import { useState, useRef } from 'react';
import { UserPlus, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';
import { BlockchainService } from './BlockchainService';
import { AIService } from './AIService';
import { Tourist } from './Tourist';
import { TouristService } from './TouristService';

const NATIONALITIES = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Argentinean", "Armenian", "Australian", "Austrian",
  "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean", "Beninese", "Bhutanese",
  "Bolivian", "Bosnian", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinese", "Burmese", "Burundian", "Cambodian",
  "Cameroonian", "Canadian", "Cape Verdean", "Chadian", "Chilean", "Chinese", "Colombian", "Congolese", "Costa Rican", "Croatian",
  "Cuban", "Cypriot", "Czech", "Danish", "Djibouti", "Dominican", "Dutch", "Ecuadorean", "Egyptian", "Emirian",
  "Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian",
  "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinean", "Guyanese", "Haitian", "Honduran", "Hungarian",
  "Icelander", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican",
  "Japanese", "Jordanian", "Kazakhstani", "Kenyan", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian",
  "Libyan", "Lithuanian", "Luxembourger", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivan", "Malian", "Maltese",
  "Mauritanian", "Mauritian", "Mexican", "Moldovan", "Monacan", "Mongolian", "Moroccan", "Mozambican", "Namibian", "Nepalese",
  "New Zealander", "Nicaraguan", "Nigerian", "North Korean", "Norwegian", "Omani", "Pakistani", "Panamanian", "Paraguayan", "Peruvian",
  "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Salvadoran", "Saudi", "Scottish", "Senegalese",
  "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", "Slovakian", "Slovenian", "Somali", "South African", "South Korean", "Spanish",
  "Sri Lankan", "Sudanese", "Surinamer", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian",
  "Thai", "Togolese", "Tunisian", "Turkish", "Ugandan", "Ukrainian", "Uruguayan", "Uzbekistani", "Venezuelan", "Vietnamese",
  "Welsh", "Yemenite", "Zambian", "Zimbabwean"
];

export default function TouristRegistration() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    passportNumber: '',
    nationality: '',
    phoneNumber: '',
    emergencyContact: '',
    bloodGroup: '',
    visitDuration: '',
    accommodationAddress: '',
    plannedItinerary: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isAIToolLoading, setIsAIToolLoading] = useState(false);
  const [digitalId, setDigitalId] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Generate blockchain-based ID
      const generatedId = await BlockchainService.generateDigitalId(formData);
      setDigitalId(generatedId);

      // 2. Save all info to the real database (TouristService)
      const newTourist = await TouristService.registerTourist({
        name: formData.name,
        country: 'India', // You could add country to the form if needed
        nationality: formData.nationality,
        passportNumber: formData.passportNumber,
        phoneNumber: formData.phoneNumber,
        emergencyContact: formData.emergencyContact,
        bloodGroup: formData.bloodGroup,
        visitDuration: formData.visitDuration,
        accommodationAddress: formData.accommodationAddress,
        plannedItinerary: formData.plannedItinerary
      });

      // 3. Register user in auth context
      await login(
        {
          id: newTourist.id,
          name: newTourist.name,
          passportNumber: newTourist.passportNumber || '',
          phoneNumber: newTourist.phoneNumber || '',
          emergencyContact: newTourist.emergencyContact || '',
          safetyScore: newTourist.safetyScore,
          currentLocation: null,
          isActive: true,
          registrationTime: newTourist.registeredAt
        },
        'tourist'
      );
    } catch (err) {
      console.error('Registration failed:', err);
      alert(t('Registration failed!'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateItinerary = async () => {
    if (!formData.accommodationAddress) {
      alert(t('Please enter your Accommodation Address first to generate an itinerary!'));
      return;
    }

    setIsAIToolLoading(true);
    try {
      const aiItinerary = await AIService.generateItinerary(formData);
      setFormData({ ...formData, plannedItinerary: aiItinerary });
    } catch (err) {
      console.error('AI Itinerary failed:', err);
      alert(t('Could not generate itinerary, please try again.'));
    } finally {
      setIsAIToolLoading(false);
    }
  };

  if (digitalId) {
    return (
      <div className="max-w-2xl mx-auto bg-green-50 rounded-lg shadow-lg p-8 text-center">
        <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">{t('Registration Successful!')}</h2>
        <p>{t('Your blockchain-based digital tourist ID:')}</p>
        <p className="font-mono text-lg break-all">{digitalId}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] my-12 border-4 border-indigo-100 shadow-[0_20px_60px_rgba(99,102,241,0.15)] animate-fade-in relative overflow-hidden">
      {/* Fun Decorative blurs */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-pink-300 rounded-full opacity-30 blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-cyan-300 rounded-full opacity-30 blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 text-center mb-10">
        <div className="bg-indigo-100 inline-block p-5 rounded-[2rem] mb-6 shadow-sm transform hover:scale-110 hover:rotate-12 transition-transform duration-300">
          <UserPlus className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight flex items-center justify-center gap-3">
          {t('Tourist Registration')} 🎒
        </h2>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">
          {t('Register to get your blockchain-based digital tourist ID for enhanced safety')}
        </p>
      </div>

      <form ref={formRef} onSubmit={handleRegister} className="relative z-10 grid md:grid-cols-2 gap-6">
        <input
          required
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={t('Full Name *')}
          className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-lg rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 block p-5 transition-all duration-300 hover:border-indigo-300"
          minLength={2}
          maxLength={100}
        />
        <input
          required
          name="passportNumber"
          value={formData.passportNumber}
          onChange={handleInputChange}
          placeholder={t('Passport Number *')}
          className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-lg rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 block p-5 transition-all duration-300 hover:border-indigo-300"
          pattern="^[A-Za-z0-9]{6,12}$"
          title="Passport number must be 6-12 alphanumeric characters"
        />
        <div className="relative">
          <select
            required
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            className={`w-full bg-slate-50 border-2 border-slate-200 text-lg rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 block p-5 transition-all duration-300 hover:border-indigo-300 appearance-none ${!formData.nationality ? 'text-slate-400' : 'text-slate-800'}`}
          >
            <option value="" disabled>{t('Select Nationality *')}</option>
            {NATIONALITIES.map(nat => (
              <option key={nat} value={nat}>{nat}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-indigo-500">
            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
        <input
          required
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder={t('Phone Number *')}
          className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-lg rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 block p-5 transition-all duration-300 hover:border-indigo-300"
          pattern="^\+?[0-9\s\-()]{7,15}$"
          title="Valid phone number (7-15 digits, optional +)"
        />
        <input
          required
          type="tel"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleInputChange}
          placeholder={t('Emergency Contact Number *')}
          className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-lg rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 block p-5 transition-all duration-300 hover:border-indigo-300"
          pattern="^\+?[0-9\s\-()]{7,15}$"
          title="Valid phone number (7-15 digits, optional +)"
        />
        <div className="relative">
          <select
            required
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            className={`w-full bg-slate-50 border-2 border-slate-200 text-lg rounded-2xl focus:ring-4 focus:ring-rose-500/30 focus:border-rose-500 block p-5 transition-all duration-300 hover:border-rose-300 appearance-none ${!formData.bloodGroup ? 'text-slate-400' : 'text-slate-800'}`}
          >
            <option value="" disabled>{t('Select Blood Group *')}</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-rose-500">
            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
        <input
          required
          type="number"
          min="1"
          max="365"
          name="visitDuration"
          value={formData.visitDuration}
          onChange={handleInputChange}
          placeholder={t('Visit Duration (days) *')}
          className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-lg rounded-2xl focus:ring-4 focus:ring-amber-500/30 focus:border-amber-500 block p-5 transition-all duration-300 hover:border-amber-300 md:col-span-2"
        />
        <input
          required
          name="accommodationAddress"
          value={formData.accommodationAddress}
          onChange={handleInputChange}
          placeholder={t('Accommodation Address *')}
          className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-lg rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 block p-5 transition-all duration-300 hover:border-emerald-300 md:col-span-2"
        />
        <textarea
          name="plannedItinerary"
          value={formData.plannedItinerary}
          onChange={handleInputChange}
          placeholder={t('Planned Itinerary (Optional)')}
          rows={4}
          className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-lg rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 block p-5 transition-all duration-300 hover:border-purple-300 md:col-span-2 resize-none"
        />

        {/* AI Generate Itinerary Button */}
        <button
          type="button"
          onClick={handleGenerateItinerary}
          disabled={isAIToolLoading}
          className="md:col-span-2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl py-5 rounded-2xl hover:from-purple-400 hover:to-pink-400 transition-all duration-300 shadow-[0_10px_30px_rgba(217,70,239,0.4)] transform hover:-translate-y-2 hover:rotate-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Sparkles className={`mr-3 h-6 w-6 ${isAIToolLoading ? 'animate-spin' : 'animate-bounce-slight'}`} />
          {isAIToolLoading
            ? t('Generating Magic Itinerary... ✨')
            : t('Generate Fun Itinerary with AI 🎨')}
        </button>

        {/* Submit Registration */}
        <button
          type="submit"
          disabled={isLoading}
          className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-2xl py-6 rounded-2xl hover:from-indigo-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_15px_40px_rgba(99,102,241,0.4)] transform hover:-translate-y-2 hover:-rotate-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-4 border-4 border-white/20"
        >
          {isLoading
            ? t('Creating Digital ID... 🚀')
            : t('Generate Digital Tourist ID 🛡️')}
        </button>
      </form>
    </div>
  );
}

export type { Tourist };
