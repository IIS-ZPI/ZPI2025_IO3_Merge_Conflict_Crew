from abc import ABC, abstractmethod
#Ta funckja dzieli
class IArithmeticsDiv(ABC):
    @abstractmethod
    def division(self, a: float, b: float) -> float:
        pass

class ArithmeticDiv(IArithmeticsDiv):
    def division(self, a: float, b: float) -> float:
        if b == 0:
            raise ValueError("Dividing by zero is not allowed")
        return a / b
      
class IArithmeticsMult(ABC):
   @abstractmethod
   def multiplication(self, A: float, B: float) -> float:
      pass

class ArithmeticsMult(IArithmeticsMult):
   def multiplication(self, A: float, B: float) -> float:
      return A * B

class IArithmeticDiff(ABC):
    @abstractmethod
    def difference(self,A: float,B: float) -> float:
        pass

class ArithmeticDiff(IArithmeticDiff):
    def difference(self, A:float,B:float) -> float:
        return A - B
#Ta funkcja dodaje
class IArithmeticsAdd(ABC):
    @abstractmethod
    def addition(self, A: float, B: float) -> float:
        pass

class ArithmeticsAdd(IArithmeticsAdd):
    def addition(self, A: float, B: float) -> float:
        return A + B

class IArithmeticsPow(ABC):
    @abstractmethod
    def power(self, A: float, B: float) -> float:
        pass
#Ta funckja poteguje
class ArithmeticsPow(IArithmeticsPow):
    def power(self, A: float, B: float) -> float:
        return A ** B