import "./App.css";
import InstanceParameters from "./components/InstanceParameters";
import AlgorithmControl from "./components/AlgorithmControl";
import Visualization from "./components/Visualization";

import GlobalProvider from "./context";

function App() {
    return (
        <GlobalProvider>
            <div className="min-h-screen bg-background py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <header className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
                            2D Bin Packing Solver
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Greedy and Local Search Algorithms
                        </p>
                    </header>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <InstanceParameters />

                            <AlgorithmControl />
                        </div>

                        <Visualization />

                        {/*<MetricsStatus metrics={metrics} />*/}
                    </div>
                </div>
            </div>
        </GlobalProvider>
    );
}

export default App;
