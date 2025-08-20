import { lazy } from 'react';

// Lazy loading des pages principales
export const HomePage = lazy(() => import('../pages/HomePage'));
export const EstimatorPage = lazy(() => import('../pages/EstimatorPage'));
export const CatalogPage = lazy(() => import('../pages/CatalogPage'));
export const CompanyPage = lazy(() => import('../pages/CompanyPage'));
export const QuotePage = lazy(() => import('../pages/QuotePage'));

// Lazy loading des modules
export const EstimatorModule = lazy(() => import('../components/EstimatorModule'));
export const CatalogModule = lazy(() => import('../components/CatalogModule'));
export const PreorderModule = lazy(() => import('../components/PreorderModule'));