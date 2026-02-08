import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Leaf, 
  Droplets, 
  Sun, 
  MessageCircle, 
  ChevronRight, 
  Star,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

const GroovyNursery = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isGulluOpen, setIsGulluOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: "Hi there! I'm Gullu, your Groovy Plant Assistant. Looking for a new green friend today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const chatEndRef = useRef(null);

  // Mock Data
  const categories = ['All', 'Indoor', 'Outdoor', 'Low Light', 'Pet Friendly', 'Succulents'];
  
  const products = [
    {
      id: 1,
      name: 'Monstera Deliciosa',
      category: 'Indoor',
      price: 45,
      rating: 4.8,
      img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=400',
      difficulty: 'Easy',
      light: 'Indirect'
    },
    {
      id: 2,
      name: 'Snake Plant Zeylanica',
      category: 'Low Light',
      price: 29,
      rating: 4.9,
      img: 'https://images.unsplash.com/photo-1593482815960-94d0e801b606?auto=format&fit=crop&q=80&w=400',
      difficulty: 'Hard to Kill',
      light: 'Low to Bright'
    },
    {
      id: 3,
      name: 'Fiddle Leaf Fig',
      category: 'Indoor',
      price: 65,
      rating: 4.5,
      img: 'https://images.unsplash.com/photo-1597055181300-e3621814d9f1?auto=format&fit=crop&q=80&w=400',
      difficulty: 'Moderate',
      light: 'Bright Indirect'
    },
    {
      id: 4,
      name: 'Spider Plant',
      category: 'Pet Friendly',
      price: 18,
      rating: 4.7,
      img: 'https://images.unsplash.com/photo-1572688066348-7359997486e4?auto=format&fit=crop&q=80&w=400',
      difficulty: 'Easy',
      light: 'Any'
    },
    {
      id: 5,
      name: 'String of Pearls',
      category: 'Succulents',
      price: 22,
      rating: 4.6,
      img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=400',
      difficulty: 'Moderate',
      light: 'Bright'
    },
    {
      id: 6,
      name: 'Peace Lily',
      category: 'Indoor',
      price: 32,
      rating: 4.8,
      img: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&q=80&w=400',
      difficulty: 'Easy',
      light: 'Medium'
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory || (activeCategory === 'Indoor' && p.category === 'Low Light'));

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...chatMessages, { role: 'user', text: userInput }];
    setChatMessages(newMessages);
    setUserInput('');

    // Simulated Gullu Response
    setTimeout(() => {
      let response = "That's a great question! Based on what you're saying, I'd recommend a Monstera if you have bright light, or a Snake Plant if your room is a bit darker. Would you like to see our care guide for those?";
      if (userInput.toLowerCase().includes('pet')) {
        response = "For pet owners, I highly recommend our Spider Plants or Calatheas! They are non-toxic and look beautiful. Shall I filter the store for pet-friendly options?";
      }
      setChatMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D5A27] font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#2D5A27]/10 px-4 py-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <Leaf className="text-[#E2725B]" />
            Groovy<span className="text-[#E2725B]">Nursery</span>
          </h1>
          <div className="hidden md:flex gap-6 font-medium text-sm uppercase tracking-wider">
            <a href="#" className="hover:text-[#E2725B] transition-colors">Shop</a>
            <a href="#" className="hover:text-[#E2725B] transition-colors">Care Guide</a>
            <a href="#" className="hover:text-[#E2725B] transition-colors">Gift Sets</a>
            <a href="#" className="hover:text-[#E2725B] transition-colors">About</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#2D5A27]/5 rounded-full"><Search size={20} /></button>
          <button className="p-2 hover:bg-[#2D5A27]/5 rounded-full relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} />
            <span className="absolute top-0 right-0 bg-[#E2725B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </button>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-75"
            alt="Nursery Background"
          />
        </div>
        <div className="relative z-10 px-4 md:px-24 max-w-4xl text-white">
          <span className="inline-block px-4 py-1 bg-[#E1AD01] text-xs font-bold uppercase rounded-full mb-6">Spring Collection '24</span>
          <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Bring the <span className="text-[#E1AD01] italic">Groove</span> to Your Living Room.
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl">
            Premium, healthy plants delivered directly from our greenhouse to your doorstep. Groovy vibes included with every pot.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#E2725B] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
              Shop Now <ArrowRight size={18} />
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
              Plant Quiz
            </button>
          </div>
        </div>
      </header>

      {/* Features Bar */}
      <div className="bg-[#2D5A27] text-[#FDFBF7] py-8 px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <CheckCircle2 className="text-[#E1AD01]" />
          <p className="text-sm font-semibold uppercase tracking-widest">Healthy Arrival Guarantee</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Droplets className="text-[#E1AD01]" />
          <p className="text-sm font-semibold uppercase tracking-widest">Expert Care Support</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Leaf className="text-[#E1AD01]" />
          <p className="text-sm font-semibold uppercase tracking-widest">Eco-Friendly Packaging</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Star className="text-[#E1AD01]" />
          <p className="text-sm font-semibold uppercase tracking-widest">Premium Quality</p>
        </div>
      </div>

      {/* Shop Section */}
      <section className="py-20 px-4 md:px-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h3 className="text-4xl font-bold mb-2">Our Best Sellers</h3>
            <p className="text-[#2D5A27]/60">Hand-picked by our experts for your home.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-[#2D5A27] text-white shadow-lg' 
                    : 'bg-[#2D5A27]/5 hover:bg-[#2D5A27]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map(product => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#F0EEE9] mb-4">
                <img 
                  src={product.img} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={product.name}
                />
                <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                  <ShoppingBag size={20} />
                </button>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                    {product.difficulty}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-bold group-hover:text-[#E2725B] transition-colors">{product.name}</h4>
                  <p className="text-sm text-[#2D5A27]/60 flex items-center gap-1">
                    <Sun size={12} /> {product.light} Light
                  </p>
                </div>
                <p className="text-xl font-bold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Groovy Section */}
      <section className="bg-[#B2AC88]/20 py-24 px-4 md:px-24 rounded-[4rem] mx-4 mb-20 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1583324113626-70df0f43aa2b?auto=format&fit=crop&q=80&w=800" 
            className="rounded-[3rem] shadow-2xl" 
            alt="Plant Care"
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">We make being a plant parent <span className="text-[#E2725B]">effortless.</span></h3>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="bg-[#2D5A27] text-white p-2 rounded-xl h-fit">
                <Leaf size={24} />
              </div>
              <div>
                <h5 className="font-bold text-lg">Curated with Love</h5>
                <p className="opacity-70">Every plant is inspected by our botanists to ensure only the healthiest specimens reach you.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="bg-[#2D5A27] text-white p-2 rounded-xl h-fit">
                <Droplets size={24} />
              </div>
              <div>
                <h5 className="font-bold text-lg">Detailed Care Guides</h5>
                <p className="opacity-70">Never worry about watering again. We provide specific schedules for every plant.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="bg-[#2D5A27] text-white p-2 rounded-xl h-fit">
                <MessageCircle size={24} />
              </div>
              <div>
                <h5 className="font-bold text-lg">24/7 Support with Gullu</h5>
                <p className="opacity-70">Our AI assistant Gullu is always here to diagnose leaf spots or suggest upgrades.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Gullu AI Chatbot */}
      <div className="fixed bottom-6 right-6 z-[100]">
        {!isGulluOpen ? (
          <button 
            onClick={() => setIsGulluOpen(true)}
            className="bg-[#2D5A27] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-[#E1AD01] rounded-full flex items-center justify-center font-bold text-xl overflow-hidden">
               <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Gullu" alt="Gullu" />
            </div>
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold">Ask Gullu</span>
          </button>
        ) : (
          <div className="bg-white w-[350px] md:w-[400px] h-[500px] rounded-3xl shadow-2xl border border-[#2D5A27]/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10">
            {/* Chat Header */}
            <div className="bg-[#2D5A27] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E1AD01] rounded-full overflow-hidden border-2 border-white">
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Gullu" alt="Gullu" />
                </div>
                <div>
                  <h4 className="font-bold leading-tight">Gullu</h4>
                  <p className="text-[10px] opacity-80 uppercase tracking-widest">AI Plant Expert</p>
                </div>
              </div>
              <button onClick={() => setIsGulluOpen(false)} className="hover:bg-white/10 p-2 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFBF7]">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#2D5A27] text-white rounded-tr-none' 
                      : 'bg-white border border-[#2D5A27]/10 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-[#2D5A27]/10 flex gap-2">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about care, pet safety..." 
                className="flex-1 bg-[#2D5A27]/5 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 ring-[#E2725B]"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-[#2D5A27] text-white p-2 rounded-xl hover:bg-[#1e3c1a]"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <footer className="bg-[#2D5A27] text-[#FDFBF7] pt-20 pb-10 px-4 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Leaf className="text-[#E1AD01]" /> Groovy Nursery
            </h2>
            <p className="text-xl opacity-70 mb-8 max-w-md">Join our green community and get 15% off your first order plus groovy plant care tips.</p>
            <div className="flex gap-2 max-w-md">
              <input type="email" placeholder="Email Address" className="bg-white/10 border border-white/20 rounded-full px-6 py-3 flex-1 text-white" />
              <button className="bg-[#E1AD01] text-[#2D5A27] font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform">Join</button>
            </div>
          </div>
          <div>
            <h6 className="font-bold uppercase tracking-widest mb-6">Explore</h6>
            <ul className="space-y-4 opacity-70">
              <li><a href="#" className="hover:text-[#E1AD01]">All Plants</a></li>
              <li><a href="#" className="hover:text-[#E1AD01]">Office Plants</a></li>
              <li><a href="#" className="hover:text-[#E1AD01]">Pet-Friendly</a></li>
              <li><a href="#" className="hover:text-[#E1AD01]">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold uppercase tracking-widest mb-6">Support</h6>
            <ul className="space-y-4 opacity-70">
              <li><a href="#" className="hover:text-[#E1AD01]">Shipping Info</a></li>
              <li><a href="#" className="hover:text-[#E1AD01]">Refund Policy</a></li>
              <li><a href="#" className="hover:text-[#E1AD01]">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#E1AD01]">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50 uppercase tracking-widest">
          <p>© 2024 Groovy Nursery. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GroovyNursery;