from abc import ABC, abstractmethod

class IArithmeticsAdd(ABC):
    @abstractmethod
    def Addition(self, A: float, B: float) -> float:
        pass

class ArithmeticsAdd(IArithmeticsAdd):
    def Addition(self, A: float, B: float) -> float:
        return A + B