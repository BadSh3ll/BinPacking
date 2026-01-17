import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
    Grid3x3,
    Hash,
    Layers,
    Package,
    Play,
    Search,
    Settings,
    Sparkles,
    Zap,
} from "lucide-react";
import useAlgorithm from "@/context/algorithm/useAlgorithm";
import {
    AlgorithmType,
    GreedyStrategy,
    LocalSearchNeighborhood,
    PuttingStrategy,
    SelectionStrategy,
} from "@/context/algorithm";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useSolution from "@/context/solution/useSolution";
import useInstance from "@/context/instance/useInstance";

export default function AlgorithmControl() {
    const {
        params: { type },
        setAlgorithm,
    } = useAlgorithm();

    const { instance } = useInstance();

    const { RunAlgorithm } = useSolution();

    const renderAlgorithmControl = () => {
        switch (type) {
            case AlgorithmType.GREEDY:
                return <GreedyControl />;
            case AlgorithmType.LOCAL_SEARCH:
                return <LocalSearchControl />;
            default:
                return null;
        }
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-foreground">
                    <Settings className="size-5 text-purple-600 dark:text-purple-400" />
                    Algorithm Control
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Algorithm Selection */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                        <Label className="text-sm font-semibold text-slate-800">
                            Algorithm
                        </Label>
                    </div>
                    <RadioGroup
                        value={type}
                        onValueChange={(value) =>
                            setAlgorithm(value as AlgorithmType)
                        }
                        className="grid grid-cols-2 gap-2"
                    >
                        <label
                            className={`relative flex items-center gap-3 p-3 rounded-md border-2 transition-all cursor-pointer hover:shadow-md ${
                                type === AlgorithmType.GREEDY
                                    ? "border-transparent bg-linear-to-br from-amber-500 to-orange-500 shadow-lg"
                                    : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                        >
                            <div
                                className={`p-1.5 rounded-md ${type === AlgorithmType.GREEDY ? "bg-white/20" : "bg-linear-to-br from-amber-500 to-orange-500"}`}
                            >
                                <Zap className="w-3.5 h-3.5 text-white" />
                            </div>
                            <RadioGroupItem
                                value={AlgorithmType.GREEDY}
                                id="greedy"
                                className={
                                    type === AlgorithmType.GREEDY
                                        ? "border-white text-white"
                                        : ""
                                }
                            />
                            <div className="flex-1">
                                <div
                                    className={`text-sm font-medium ${type === AlgorithmType.GREEDY ? "text-white" : "text-slate-900"}`}
                                >
                                    Greedy
                                </div>
                                <div
                                    className={`text-xs mt-0.5 ${type === AlgorithmType.GREEDY ? "text-white/90" : "text-slate-500"}`}
                                >
                                    Fast heuristic
                                </div>
                            </div>
                        </label>
                        <label
                            className={`relative flex items-center gap-3 p-3 rounded-md border-2 transition-all cursor-pointer hover:shadow-md ${
                                type === AlgorithmType.LOCAL_SEARCH
                                    ? "border-transparent bg-linear-to-br from-rose-500 to-pink-500 shadow-lg"
                                    : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                        >
                            <div
                                className={`p-1.5 rounded-md ${type === AlgorithmType.LOCAL_SEARCH ? "bg-white/20" : "bg-linear-to-br from-rose-500 to-pink-500"}`}
                            >
                                <Search className="w-3.5 h-3.5 text-white" />
                            </div>
                            <RadioGroupItem
                                value={AlgorithmType.LOCAL_SEARCH}
                                id="localSearch"
                                className={
                                    type === AlgorithmType.LOCAL_SEARCH
                                        ? "border-white text-white"
                                        : ""
                                }
                            />
                            <div className="flex-1">
                                <div
                                    className={`text-sm font-medium ${type === AlgorithmType.LOCAL_SEARCH ? "text-white" : "text-slate-900"}`}
                                >
                                    Local Search
                                </div>
                                <div
                                    className={`text-xs mt-0.5 ${type === AlgorithmType.LOCAL_SEARCH ? "text-white/90" : "text-slate-500"}`}
                                >
                                    Iterative optimization
                                </div>
                            </div>
                        </label>
                    </RadioGroup>
                </div>

                {renderAlgorithmControl()}

                <div className="pt-2">
                    <Button
                        onClick={RunAlgorithm}
                        disabled={!instance}
                        className="w-full bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
                    >
                        <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Run Algorithm
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function GreedyControl() {
    const {
        params: { greedy },
        setGreedyStrategy,
        setGreedySelection,
        setGreedyPutting,
    } = useAlgorithm();

    const strategyGroups = [
        {
            label: "Greedy Strategy",
            icon: Sparkles,
            color: "from-violet-500 to-purple-500",
            value: greedy?.strategy,
            onChange: setGreedyStrategy,
            options: [
                {
                    value: GreedyStrategy.FIRST_FIT,
                    label: "First Fit",
                    desc: "Pack items in first available space",
                },
                {
                    value: GreedyStrategy.BEST_FIT,
                    label: "Best Fit",
                    desc: "Find the most efficient placement",
                },
            ],
        },
        {
            label: "Selection Strategy",
            icon: Layers,
            color: "from-blue-500 to-cyan-500",
            value: greedy?.selection,
            onChange: setGreedySelection,
            options: [
                {
                    value: SelectionStrategy.LARGEST_AREA_FIRST,
                    label: "Largest Area First",
                    desc: "Prioritize by total area",
                },
                {
                    value: SelectionStrategy.LARGEST_HEIGHT_FIRST,
                    label: "Largest Height First",
                    desc: "Prioritize by height",
                },
            ],
        },
        {
            label: "Putting Strategy",
            icon: Package,
            color: "from-emerald-500 to-teal-500",
            value: greedy?.putting,
            onChange: setGreedyPutting,
            options: [
                {
                    value: PuttingStrategy.BOTTOM_LEFT,
                    label: "Bottom Left",
                    desc: "Align to bottom-left corner",
                },
                {
                    value: PuttingStrategy.SHELF,
                    label: "Shelf",
                    desc: "Use shelf-based packing",
                },
            ],
        },
    ];

    return (
        <div className="space-y-4 p-4 bg-linear-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
            {strategyGroups.map((group) => {
                const Icon = group.icon;
                return (
                    <div key={group.label} className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div
                                className={`p-1.5 rounded-md bg-linear-to-br ${group.color} shadow-sm`}
                            >
                                <Icon className="w-3.5 h-3.5 text-white" />
                            </div>
                            <Label className="text-sm font-semibold text-slate-800">
                                {group.label}
                            </Label>
                        </div>
                        <RadioGroup
                            value={group.value}
                            onValueChange={group.onChange}
                            className="grid grid-cols-2 gap-2"
                        >
                            {group.options.map((option) => (
                                <label
                                    key={option.value}
                                    className={`relative flex items-start gap-2.5 p-3 rounded-md border-2 transition-all cursor-pointer hover:shadow-md ${
                                        group.value === option.value
                                            ? `border-transparent bg-linear-to-br ${group.color} shadow-lg`
                                            : "border-slate-200 bg-white hover:border-slate-300"
                                    }`}
                                >
                                    <RadioGroupItem
                                        value={option.value}
                                        id={option.value}
                                        className={
                                            group.value === option.value
                                                ? "border-white text-white"
                                                : ""
                                        }
                                    />
                                    <div className="flex-1">
                                        <div
                                            className={`text-sm font-medium ${group.value === option.value ? "text-white" : "text-slate-900"}`}
                                        >
                                            {option.label}
                                        </div>
                                        <div
                                            className={`text-xs mt-0.5 ${group.value === option.value ? "text-white/90" : "text-slate-500"}`}
                                        >
                                            {option.desc}
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </RadioGroup>
                    </div>
                );
            })}
        </div>
    );
}

function LocalSearchControl() {
    const {
        params: { localSearch },
        setLocalSearchNeighborhood,
        setLocalSearchMaxIterations,
    } = useAlgorithm();

    return (
        <div className="space-y-4 p-4 bg-linear-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
            {/* Neighborhood Strategy */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-linear-to-br from-indigo-500 to-purple-500 shadow-sm">
                        <Grid3x3 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <Label className="text-sm font-semibold text-slate-800">
                        Neighborhood Strategy
                    </Label>
                </div>
                <RadioGroup
                    value={localSearch?.neighborhood}
                    onValueChange={setLocalSearchNeighborhood}
                    className="grid gap-2"
                >
                    <label
                        className={`relative flex items-start gap-2.5 p-3 rounded-md border-2 transition-all cursor-pointer hover:shadow-md ${
                            localSearch?.neighborhood ===
                            LocalSearchNeighborhood.GEOMETRY
                                ? "border-transparent bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg"
                                : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    >
                        <RadioGroupItem
                            value={LocalSearchNeighborhood.GEOMETRY}
                            id="geometry"
                            className={
                                localSearch?.neighborhood ===
                                LocalSearchNeighborhood.GEOMETRY
                                    ? "border-white text-white"
                                    : ""
                            }
                        />
                        <div className="flex-1">
                            <div
                                className={`text-sm font-medium ${localSearch?.neighborhood === LocalSearchNeighborhood.GEOMETRY ? "text-white" : "text-slate-900"}`}
                            >
                                Geometry
                            </div>
                            <div
                                className={`text-xs mt-0.5 ${localSearch?.neighborhood === LocalSearchNeighborhood.GEOMETRY ? "text-white/90" : "text-slate-500"}`}
                            >
                                Modify positions and rotations
                            </div>
                        </div>
                    </label>
                    <label
                        className={`relative flex items-start gap-2.5 p-3 rounded-md border-2 transition-all cursor-pointer hover:shadow-md ${
                            localSearch?.neighborhood ===
                            LocalSearchNeighborhood.PERMUTATION
                                ? "border-transparent bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg"
                                : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    >
                        <RadioGroupItem
                            value={LocalSearchNeighborhood.PERMUTATION}
                            id="permutation"
                            className={
                                localSearch?.neighborhood ===
                                LocalSearchNeighborhood.PERMUTATION
                                    ? "border-white text-white"
                                    : ""
                            }
                        />
                        <div className="flex-1">
                            <div
                                className={`text-sm font-medium ${localSearch?.neighborhood === LocalSearchNeighborhood.PERMUTATION ? "text-white" : "text-slate-900"}`}
                            >
                                Permutation
                            </div>
                            <div
                                className={`text-xs mt-0.5 ${localSearch?.neighborhood === LocalSearchNeighborhood.PERMUTATION ? "text-white/90" : "text-slate-500"}`}
                            >
                                Swap and reorder items
                            </div>
                        </div>
                    </label>
                    <label
                        className={`relative flex items-start gap-2.5 p-3 rounded-md border-2 transition-all cursor-pointer hover:shadow-md ${
                            localSearch?.neighborhood ===
                            LocalSearchNeighborhood.OVERLAP
                                ? "border-transparent bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg"
                                : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    >
                        <RadioGroupItem
                            value={LocalSearchNeighborhood.OVERLAP}
                            id="overlap"
                            className={
                                localSearch?.neighborhood ===
                                LocalSearchNeighborhood.OVERLAP
                                    ? "border-white text-white"
                                    : ""
                            }
                        />
                        <div className="flex-1">
                            <div
                                className={`text-sm font-medium ${localSearch?.neighborhood === LocalSearchNeighborhood.OVERLAP ? "text-white" : "text-slate-900"}`}
                            >
                                Overlap
                            </div>
                            <div
                                className={`text-xs mt-0.5 ${localSearch?.neighborhood === LocalSearchNeighborhood.OVERLAP ? "text-white/90" : "text-slate-500"}`}
                            >
                                Resolve overlapping placements
                            </div>
                        </div>
                    </label>
                </RadioGroup>
            </div>

            {/* Max Iterations */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-linear-to-br from-fuchsia-500 to-pink-500 shadow-sm">
                        <Hash className="w-3.5 h-3.5 text-white" />
                    </div>
                    <Label className="text-sm font-semibold text-slate-800">
                        Max Iterations
                    </Label>
                </div>
                <div className="relative">
                    <Input
                        type="number"
                        value={localSearch?.maxIterations}
                        onChange={(e) =>
                            setLocalSearchMaxIterations(
                                parseInt(e.target.value) || 0,
                            )
                        }
                        min={1}
                        max={10000}
                        className="pr-20 border-2 border-slate-200 focus:border-fuchsia-400 focus:ring-fuchsia-400"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                        iterations
                    </div>
                </div>
                <p className="text-xs text-slate-500">
                    Number of optimization iterations to perform
                </p>
            </div>
        </div>
    );
}
