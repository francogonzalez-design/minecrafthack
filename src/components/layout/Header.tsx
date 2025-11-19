// src/components/layout/Header.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Proyectos', href: '/projects' },
  { name: 'Tareas', href: '/tasks' },
  { name: 'Equipo', href: '/team' },
];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Navegación Desktop */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">TechFlow</h1>
            </Link>
            
            <nav className="hidden md:ml-8 md:flex md:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* User menu y Mobile menu button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-sm text-gray-700">
              Hola, <span className="font-medium">{user?.name}</span>
            </div>
            
            <Button variant="secondary" size="sm" onClick={logout}>
              Cerrar Sesión
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menú</span>
              <div className="w-6 h-6">
                <div className={`transform transition ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''} h-0.5 w-6 bg-current mb-1.5`}></div>
                <div className={`transition ${isMenuOpen ? 'opacity-0' : ''} h-0.5 w-6 bg-current mb-1.5`}></div>
                <div className={`transform transition ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''} h-0.5 w-6 bg-current`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t border-gray-200">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 text-sm text-gray-500 border-t border-gray-200 mt-2 pt-2">
                Conectado como {user?.name}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;