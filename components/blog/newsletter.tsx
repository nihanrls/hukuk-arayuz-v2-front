import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter abonelik işlemleri burada yapılacak
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-[#111C31] mb-4 font-ubuntu">
        Hukuk Bültenimize Abone Olun
      </h3>
      <p className="text-gray-600 mb-4 font-nunito">
        Güncel hukuki gelişmeler ve makalelerden haberdar olun.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6454a4] text-black"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#6454a4] text-white py-2 rounded-lg hover:bg-[#6454a4]/90 transition-colors"
        >
          Abone Ol
        </button>
      </form>
    </div>
  );
};

export default Newsletter; 