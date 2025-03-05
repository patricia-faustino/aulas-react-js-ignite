import { Routes, Route } from 'react-router-dom';
import { History } from './components/pages/History';
import { Home } from './components/pages/Home/index';
import { DefaultLayout } from './layouts/DefaultLayout';

export function Router() {
    return(
        <Routes>
           {/* o route layout acompanha os paths que estão dentro dele.
            o path do route layout é somado ao path do route que está dentro dele. Por exemplo, o path do route layout é /admin e o interno é /products o path será /admin/path. */}

            <Route path="/" element={<DefaultLayout/>}>
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />
            </Route>
        </Routes>
    )
}