import React, { useState } from 'react';
import { Heart, MessageCircle, BookOpen, User, Menu, Mail, ArrowLeft, Send } from 'lucide-react';

export default function MentalHealthApp() {
  const [activeScreen, setActiveScreen] = useState('onboarding');
  const [activeCommunity, setActiveCommunity] = useState(null);
  
  const handleSelectCommunity = (community) => {
    setActiveCommunity(community);
    setActiveScreen('community');
  };
  
  const handleBack = () => {
    if (activeScreen === 'community' || activeScreen === 'chat' || activeScreen === 'mindfulness') {
      setActiveScreen('home');
    } else if (activeScreen === 'communityChat') {
      setActiveScreen('community');
    } else {
      setActiveScreen('onboarding');
    }
  };
  
  const renderScreen = () => {
    switch (activeScreen) {
      case 'onboarding':
        return <OnboardingScreen setActiveScreen={setActiveScreen} />;
      case 'home':
        return <HomeScreen setActiveScreen={setActiveScreen} handleSelectCommunity={handleSelectCommunity} />;
      case 'community':
        return <CommunityScreen community={activeCommunity} setActiveScreen={setActiveScreen} />;
      case 'communityChat':
        return <CommunityChatScreen community={activeCommunity} />;
      case 'chat':
        return <ChatScreen />;
      case 'mindfulness':
        return <MindfulnessScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <OnboardingScreen setActiveScreen={setActiveScreen} />;
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {activeScreen !== 'onboarding' && (
        <Header activeScreen={activeScreen} handleBack={handleBack} community={activeCommunity} />
      )}
      <div className="flex-1 overflow-y-auto">
        {renderScreen()}
      </div>
      {activeScreen !== 'onboarding' && (
        <BottomNav setActiveScreen={setActiveScreen} activeScreen={activeScreen} />
      )}
    </div>
  );
}

function Header({ activeScreen, handleBack, community }) {
  const getTitle = () => {
    switch (activeScreen) {
      case 'home': 
        return 'BemMental';
      case 'community': 
        return community?.name || 'Comunidade';
      case 'communityChat': 
        return 'Chat da Comunidade';
      case 'chat': 
        return 'Chat de Apoio';
      case 'mindfulness': 
        return 'Práticas de Mindfulness';
      case 'profile': 
        return 'Meu Perfil';
      default: 
        return 'BemMental';
    }
  };

  return (
    <div className="bg-teal-600 text-white p-4 flex items-center">
      {(activeScreen !== 'home') && (
        <button className="mr-2" onClick={handleBack}>
          <ArrowLeft size={24} />
        </button>
      )}
      <h1 className="text-xl font-bold flex-1">{getTitle()}</h1>
      <button>
        <Menu size={24} />
      </button>
    </div>
  );
}

function BottomNav({ setActiveScreen, activeScreen }) {
  return (
    <div className="bg-white border-t border-gray-200 flex justify-around p-2">
      <NavButton 
        icon={<Heart size={24} />} 
        label="Bem-estar" 
        isActive={activeScreen === 'mindfulness'}
        onClick={() => setActiveScreen('mindfulness')}
      />
      <NavButton 
        icon={<MessageCircle size={24} />} 
        label="Conversas" 
        isActive={activeScreen === 'chat'}
        onClick={() => setActiveScreen('chat')}
      />
      <NavButton 
        icon={<BookOpen size={24} />} 
        label="Início" 
        isActive={activeScreen === 'home'}
        onClick={() => setActiveScreen('home')}
      />
      <NavButton 
        icon={<User size={24} />} 
        label="Perfil" 
        isActive={activeScreen === 'profile'}
        onClick={() => setActiveScreen('profile')}
      />
    </div>
  );
}

function NavButton({ icon, label, onClick, isActive }) {
  return (
    <button 
      className={`flex flex-col items-center p-1 ${isActive ? 'text-teal-600' : 'text-gray-500'}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}

function OnboardingScreen({ setActiveScreen }) {
  const [step, setStep] = useState(1);
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setActiveScreen('home');
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <div className="bg-teal-100 p-6 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
              <Heart size={64} className="text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Bem-vindo ao BemMental</h2>
            <p className="text-gray-600 mb-8">Um espaço seguro para cuidar da sua saúde mental junto com sua comunidade.</p>
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <div className="bg-blue-100 p-6 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
              <MessageCircle size={64} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Conecte-se com sua comunidade</h2>
            <p className="text-gray-600 mb-8">Participe de grupos de apoio anônimos e converse com pessoas que entendem sua realidade.</p>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <div className="bg-purple-100 p-6 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
              <BookOpen size={64} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Recursos personalizados</h2>
            <p className="text-gray-600 mb-8">Acesse exercícios de mindfulness e conteúdos adaptados para suas necessidades específicas.</p>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col justify-between h-full p-6 bg-white">
      <div className="flex-1 flex items-center justify-center">
        {renderStep()}
      </div>
      <div className="mt-8">
        <div className="flex justify-center mb-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`w-3 h-3 mx-1 rounded-full ${step === i ? 'bg-teal-600' : 'bg-gray-300'}`} 
            />
          ))}
        </div>
        <button 
          onClick={handleNext}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium"
        >
          {step < 3 ? 'Continuar' : 'Começar'}
        </button>
      </div>
    </div>
  );
}

function HomeScreen({ setActiveScreen, handleSelectCommunity }) {
  const communities = [
    { id: 1, name: 'Jovens Universitários', members: 2543, color: 'bg-blue-100', textColor: 'text-blue-600' },
    { id: 2, name: 'Profissionais Autônomos', members: 1872, color: 'bg-purple-100', textColor: 'text-purple-600' },
    { id: 3, name: 'Imigrantes no Brasil', members: 958, color: 'bg-green-100', textColor: 'text-green-600' },
    { id: 4, name: 'Mães de Primeira Viagem', members: 1245, color: 'bg-pink-100', textColor: 'text-pink-600' }
  ];
  
  const exercises = [
    { id: 1, title: 'Respiração Consciente', duration: '5 min', color: 'bg-blue-100', icon: '🧘‍♀️' },
    { id: 2, title: 'Escaneamento Corporal', duration: '10 min', color: 'bg-teal-100', icon: '✨' },
    { id: 3, title: 'Visualização Guiada', duration: '15 min', color: 'bg-purple-100', icon: '🌈' }
  ];
  
  return (
    <div className="p-4">
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Comunidades para Você</h2>
        <div className="space-y-3">
          {communities.map(community => (
            <div 
              key={community.id}
              className="bg-white rounded-lg shadow p-4 flex items-center cursor-pointer"
              onClick={() => handleSelectCommunity(community)}
            >
              <div className={`${community.color} ${community.textColor} w-12 h-12 rounded-full flex items-center justify-center mr-4 font-bold text-xl`}>
                {community.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{community.name}</h3>
                <p className="text-sm text-gray-500">{community.members} membros</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Exercícios de Mindfulness</h2>
          <button 
            className="text-teal-600 text-sm font-medium"
            onClick={() => setActiveScreen('mindfulness')}
          >
            Ver todos
          </button>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {exercises.map(exercise => (
            <div 
              key={exercise.id}
              className="bg-white rounded-lg shadow p-4 min-w-[160px]"
            >
              <div className={`${exercise.color} w-10 h-10 rounded-full flex items-center justify-center mb-3 text-xl`}>
                {exercise.icon}
              </div>
              <h3 className="font-medium text-gray-800 mb-1">{exercise.title}</h3>
              <p className="text-sm text-gray-500">{exercise.duration}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
          <h3 className="font-medium text-teal-800 mb-2">Como está se sentindo hoje?</h3>
          <p className="text-sm text-teal-600 mb-3">Registre seu humor diário para acompanhar seu progresso</p>
          <button className="bg-teal-600 text-white py-2 px-4 rounded-lg text-sm font-medium">
            Fazer check-in
          </button>
        </div>
      </section>
    </div>
  );
}

function CommunityScreen({ community, setActiveScreen }) {
  if (!community) return null;
  
  const resources = [
    { id: 1, title: 'Lidando com Ansiedade Social', type: 'Artigo', minutes: 5 },
    { id: 2, title: 'Equilíbrio entre Estudos e Saúde Mental', type: 'Podcast', minutes: 22 },
    { id: 3, title: 'Técnicas de Respiração para Reduzir Estresse', type: 'Vídeo', minutes: 8 }
  ];
  
  return (
    <div className="p-4">
      <div className={`${community.color} ${community.textColor} rounded-lg p-6 mb-6`}>
        <h2 className="text-xl font-bold mb-2">{community.name}</h2>
        <p className="text-sm mb-4">{community.members} membros nesta comunidade</p>
        <p className="text-sm mb-4">Um espaço seguro para compartilhar experiências, desafios e conquistas relacionados à saúde mental.</p>
        <button 
          className={`${community.textColor.replace('text', 'bg')} bg-opacity-90 text-white py-2 px-4 rounded-lg text-sm font-medium`}
          onClick={() => setActiveScreen('communityChat')}
        >
          Entrar no Chat da Comunidade
        </button>
      </div>
      
      <section className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Recursos Recomendados</h3>
        <div className="space-y-3">
          {resources.map(resource => (
            <div key={resource.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between mb-2">
                <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">{resource.type}</span>
                <span className="text-xs text-gray-500">{resource.minutes} min</span>
              </div>
              <h4 className="font-medium text-gray-800">{resource.title}</h4>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Sobre Esta Comunidade</h3>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm mb-3">
            Esta comunidade foi criada para oferecer suporte e compreensão mútua entre {community.name.toLowerCase()}. 
            Aqui você pode compartilhar suas experiências, fazer perguntas e receber apoio de pessoas que estão 
            passando por situações semelhantes.
          </p>
          <p className="text-gray-600 text-sm">
            Todas as conversas são moderadas por nossa IA para garantir um ambiente seguro e acolhedor. 
            Sua privacidade é nossa prioridade.
          </p>
        </div>
      </section>
    </div>
  );
}

function CommunityChatScreen({ community }) {
  const [message, setMessage] = useState('');
  
  const messages = [
    { id: 1, text: "Olá a todos! Alguém mais está tendo dificuldade para dormir por causa da ansiedade com as provas?", user: "Anônimo #1452", time: "10:23", isCurrentUser: false },
    { id: 2, text: "Sim! Estou tentando técnicas de respiração antes de dormir, mas nem sempre funciona.", user: "Anônimo #5789", time: "10:25", isCurrentUser: false },
    { id: 3, text: "Eu também estava assim semana passada. O que me ajudou foi limitar o uso do celular duas horas antes de dormir.", user: "Anônimo #8236", time: "10:28", isCurrentUser: true },
    { id: 4, text: "Alguém já experimentou meditação guiada? Há alguns exercícios muito bons aqui no app.", user: "Anônimo #3367", time: "10:30", isCurrentUser: false },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-teal-50 text-teal-800 p-3 rounded-lg text-sm">
          <p>Bem-vindo ao chat da comunidade! Lembre-se:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Respeite todos os membros</li>
            <li>Sua identidade permanece anônima</li>
            <li>Nossa IA monitora a conversa para manter um ambiente seguro</li>
          </ul>
        </div>
        
        {messages.map(msg => (
          <div 
            key={msg.id}
            className={`flex flex-col ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}
          >
            <div className={`max-w-[80%] rounded-lg p-3 ${
              msg.isCurrentUser ? 'bg-teal-600 text-white' : 'bg-white shadow'
            }`}>
              <p className="text-sm mb-1">{msg.text}</p>
            </div>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <span>{msg.user}</span>
              <span className="mx-1">•</span>
              <span>{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-3 bg-white">
        <div className="flex items-center">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva sua mensagem..."
            className="flex-1 bg-gray-100 rounded-full py-2 px-4 mr-2 focus:outline-none"
          />
          <button className="bg-teal-600 text-white rounded-full p-2">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatScreen() {
  const therapists = [
    { id: 1, name: "Dra. Ana Silva", specialty: "Ansiedade e Depressão", available: true },
    { id: 2, name: "Dr. Lucas Mendes", specialty: "Trauma e Estresse", available: true },
    { id: 3, name: "Dra. Carla Oliveira", specialty: "Autoestima e Relacionamentos", available: false }
  ];
  
  const supportGroups = [
    { id: 1, name: "Ansiedade no dia a dia", participants: 8, active: true },
    { id: 2, name: "Superando perdas", participants: 5, active: true },
    { id: 3, name: "Equilíbrio trabalho-vida", participants: 12, active: false, nextSession: "Amanhã, 19h" }
  ];
  
  return (
    <div className="p-4">
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Chat Individual</h2>
        <div className="space-y-3">
          {therapists.map(therapist => (
            <div key={therapist.id} className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mr-4 font-bold">
                {therapist.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{therapist.name}</h3>
                <p className="text-sm text-gray-500">{therapist.specialty}</p>
              </div>
              <div>
                {therapist.available ? (
                  <button className="bg-teal-100 text-teal-600 py-1 px-3 rounded-full text-sm font-medium">
                    Disponível
                  </button>
                ) : (
                  <button className="bg-gray-100 text-gray-500 py-1 px-3 rounded-full text-sm font-medium">
                    Indisponível
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Grupos de Apoio</h2>
        <div className="space-y-3">
          {supportGroups.map(group => (
            <div key={group.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-gray-800 mb-1">{group.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{group.participants} participantes</p>
              {group.active ? (
                <button className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-sm font-medium">
                  Sessão ativa agora
                </button>
              ) : (
                <button className="bg-gray-100 text-gray-500 py-1 px-3 rounded-full text-sm font-medium">
                  Próxima sessão: {group.nextSession}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MindfulnessScreen() {
  const categories = ["Todos", "Ansiedade", "Sono", "Foco", "Estresse"];
  const [activeCategory, setActiveCategory] = useState("Todos");
  
  const exercises = [
    { 
      id: 1, 
      title: "Respiração 4-7-8", 
      description: "Técnica de respiração que ajuda a acalmar o sistema nervoso", 
      duration: "5 min", 
      category: "Ansiedade",
      color: "bg-blue-100",
      icon: "🌬️" 
    },
    { 
      id: 2, 
      title: "Body Scan Relaxante", 
      description: "Escaneamento corporal para aliviar tensões e preparar para o sono", 
      duration: "10 min", 
      category: "Sono",
      color: "bg-indigo-100",
      icon: "✨" 
    },
    { 
      id: 3, 
      title: "Atenção Plena ao Momento", 
      description: "Exercício para treinar o foco no momento presente", 
      duration: "7 min", 
      category: "Foco",
      color: "bg-teal-100",
      icon: "🧠" 
    },
    { 
      id: 4, 
      title: "Visualização da Natureza", 
      description: "Guia para reduzir estresse através de imagens mentais", 
      duration: "12 min", 
      category: "Estresse",
      color: "bg-green-100",
      icon: "🌳" 
    },
  ];
  
  const filteredExercises = activeCategory === "Todos" 
    ? exercises 
    : exercises.filter(ex => ex.category === activeCategory);
  
  return (
    <div className="p-4">
      <div className="flex space-x-2 overflow-x-auto mb-4 pb-2">
        {categories.map(category => (
          <button
            key={category}
            className={`py-1 px-3 rounded-full text-sm whitespace-nowrap ${
              activeCategory === category 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        {filteredExercises.map(exercise => (
          <div key={exercise.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start">
              <div className={`${exercise.color} w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl`}>
                {exercise.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 mb-1">{exercise.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{exercise.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                    {exercise.duration}
                  </span>
                  <button className="bg-teal-600 text-white py-1 px-4 rounded-full text-sm font-medium">
                    Iniciar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen() {
  const stats = [
    { label: "Check-ins", value: 12 },
    { label: "Exercícios", value: 8 },
    { label: "Dias seguidos", value: 5 }
  ];
  
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-6 mb-6 text-center">
        <div className="bg-teal-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
          <User size={40} className="text-teal-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Usuário Anônimo</h2>
        <p className="text-sm text-gray-500 mb-4">Membro desde Maio 2025</p>
        
        <div className="flex justify-around mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-teal-600">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
        
        <button className="bg-teal-600 text-white py-2 px-4 rounded-lg text-sm font-medium">
          Editar Perfil
        </button>
      </div>
      
      <div className="space-y-3">
        <button className="w-full bg-white rounded-lg shadow p-4 flex items-center">
          <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mr-4">
            <Mail size={20} />
          </div>
          <span className="text-gray-800">Notificações</span>
        </button>
        
        <button className="w-full bg-white rounded-lg shadow p-4 flex items-center">
          <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center mr-4">
            <BookOpen size={20} />
          </div>
          <span className="text-gray-800">Meu Progresso</span>
        </button>
        
        <button className="w-full bg-white rounded-lg shadow p-4 flex items-center">
          <div className="bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center mr-4">
            <MessageCircle size={20} />
          </div>
          <span className="text-gray-800">Minhas Comunidades</span>
        </button>
      </div>
    </div>
  );
}
