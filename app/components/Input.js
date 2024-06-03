import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputForm = ({ key, label, placeholder, icons, onChange }) =>
{
    const handleChange = (e) => {
        onChange(e.target.value);
    };
    return (
        <div class="relative">
            <label class="block mb-2 text-sm font-medium text-gray-700">{label}</label>
            <div class="relative mt-1">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FontAwesomeIcon icon={icons} className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    class="w-full py-2 pl-10 pr-4 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:placeholder-gray-300"
                    placeholder={placeholder}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default InputForm